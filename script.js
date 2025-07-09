// script.js

window.addEventListener('DOMContentLoaded', () => {
  // 1) Footer-Jahr automatisch setzen
  document.getElementById('year').textContent = new Date().getFullYear();

  // 2) Smooth Scroll für alle internen Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document
        .querySelector(anchor.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 3) FullCalendar initialisieren und ICS-Feed laden
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'listMonth',
    locale: 'de',
    headerToolbar: false,
    events: fetch('https://kreis-bergstrasse.die-linke-hessen.de/events.ics')
      .then(res => res.text())
      .then(ics => {
        const jcal = ICAL.parse(ics);
        const comp = new ICAL.Component(jcal);
        return comp
          .getAllSubcomponents('vevent')
          .map(c => {
            const ev = new ICAL.Event(c);
            return { title: ev.summary, start: ev.startDate.toJSDate() };
          });
      })
  });
  calendar.render();
});