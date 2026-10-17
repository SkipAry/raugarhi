const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Execute the production booking block, avoiding unrelated animation/browser APIs.
const script = fs.readFileSync(path.join(__dirname, '../dist/app.js'), 'utf8');
const start = script.indexOf("const form = document.querySelector('#reservation-form');");
const end = script.indexOf("const video = document.querySelector('#hero-video');", start);
assert.ok(start >= 0 && end > start, 'Production reservation block must exist');
const bookingCode = `${script.match(/^const WHATSAPP = .*;/m)[0]}\n${script.slice(start, end)}`;
const now = new Date(2026, 9, 18, 12, 30, 30).getTime();

function setup(values = {}) {
  const listeners = new Map();
  const clicks = [];
  const fields = Object.fromEntries(Object.entries({
    name: 'Guest', date: '2026-10-20', time: '13:15', guests: '4 guests', occasion: '', note: '', ...values,
  }).map(([name, value]) => [name, {
    value, validationMessage: '', min: '',
    addEventListener(event, callback) { listeners.set(`${name}:${event}`, callback); },
    setCustomValidity(message) { this.validationMessage = message; },
    reportValidity() { return !this.validationMessage; },
  }]));
  let disabled = true;
  const button = {
    get disabled() { return disabled; },
    set disabled(value) {
      if (!value) assert.equal(typeof listeners.get('submit'), 'function', 'Attach submit handler before enabling');
      disabled = value;
    },
  };
  const form = {
    elements: fields,
    addEventListener(event, callback) { listeners.set(event, callback); },
    reportValidity() { return Object.values(fields).every(field => !field.validationMessage); },
    querySelector(selector) { assert.equal(selector, 'button[type="submit"]'); return button; },
  };
  const status = { textContent: '' };
  class FixedDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const document = {
    querySelector(selector) {
      if (selector === '#reservation-form') return form;
      if (selector === '#form-status') return status;
      throw new Error(`Unexpected selector ${selector}`);
    },
    createElement(tag) {
      assert.equal(tag, 'a');
      return { click() { clicks.push({ href: this.href, target: this.target, rel: this.rel }); } };
    },
  };
  vm.runInNewContext(bookingCode, {
    document, Date: FixedDate,
    FormData: class { constructor(actualForm) { assert.equal(actualForm, form); } get(name) { return fields[name].value; } },
  }, { filename: 'production-reservation.js' });
  return {
    fields, clicks, status, button,
    input(name, value) { fields[name].value = value; listeners.get(`${name}:input`)(); },
    submit() {
      let prevented = false;
      listeners.get('submit')({ preventDefault() { prevented = true; } });
      assert.equal(prevented, true, 'Never use default form navigation');
    },
  };
}

test('valid request encodes every exact booking detail for the confirmed WhatsApp recipient', () => {
  const app = setup({ name: '  शुभम & A+B #1  ', occasion: 'Birthday', note: '  Allergy: nuts & milk?\nखिडकीजवळ + 2  ' });
  app.submit();
  assert.equal(app.clicks.length, 1);
  const opened = app.clicks[0];
  const url = new URL(opened.href);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/919272303682');
  assert.deepEqual([...url.searchParams.keys()], ['text']);
  assert.equal(url.searchParams.get('text'), [
    'Namaskar! I’d like to request a table at Rau Garhi.', '', 'Name: शुभम & A+B #1',
    'Date: Tuesday, 20 October 2026', 'Preferred time: 13:15', 'Guests: 4 guests',
    'Occasion: Birthday', 'Note: Allergy: nuts & milk?\nखिडकीजवळ + 2', '',
    'Please let me know availability and confirm my reservation. Thank you!',
  ].join('\n'));
  assert.equal(opened.target, '_blank');
  assert.equal(opened.rel, 'noopener');
  assert.match(app.status.textContent, /Tap send in WhatsApp/);
});

test('optional occasion defaults and blank notes are omitted', () => {
  const app = setup({ note: '  \n ' });
  app.submit();
  const message = new URL(app.clicks[0].href).searchParams.get('text');
  assert.match(message, /Occasion: A meal together/);
  assert.doesNotMatch(message, /Note:/);
});

test('whitespace-only name blocks navigation and recovers when edited', () => {
  const app = setup({ name: ' \t ' });
  app.submit();
  assert.equal(app.clicks.length, 0);
  assert.match(app.fields.name.validationMessage, /enter your name/);
  app.input('name', 'Guest');
  assert.equal(app.fields.name.validationMessage, '');
  app.submit();
  assert.equal(app.clicks.length, 1);
});

for (const [label, date, time] of [
  ['past day', '2026-10-17', '23:59'],
  ['earlier today', '2026-10-18', '11:59'],
  ['current minute', '2026-10-18', '12:30'],
]) {
  test(`${label} blocks navigation even if native validity does not enforce min`, () => {
    const app = setup({ date, time });
    app.submit();
    assert.equal(app.clicks.length, 0);
    assert.match(app.fields.time.validationMessage, /future/);
    assert.equal(app.status.textContent, '');
  });
}

test('editing date or time clears custom errors and updates time limits', () => {
  const app = setup({ date: '2026-10-18', time: '11:00' });
  assert.equal(app.fields.date.min, '2026-10-18');
  assert.equal(app.fields.time.min, '12:30');
  app.submit();
  app.input('time', '13:00');
  assert.equal(app.fields.time.validationMessage, '');
  app.submit();
  assert.equal(app.clicks.length, 1);
  app.input('time', '11:00');
  app.submit();
  app.input('date', '2026-10-20');
  assert.equal(app.fields.time.validationMessage, '');
  assert.equal(app.fields.time.min, '');
  app.submit();
  assert.equal(app.clicks.length, 2);
});

test('submission stays disabled in HTML and enables after the handler attaches', () => {
  const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
  const formHtml = html.match(/<form id="reservation-form">[\s\S]*?<\/form>/)[0];
  assert.match(formHtml, /<button\b[^>]*type="submit"[^>]*\bdisabled\b/);
  assert.equal(setup().button.disabled, false);
});
