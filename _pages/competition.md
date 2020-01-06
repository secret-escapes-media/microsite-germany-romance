---
layout: competition
id: competition
permalink: /competition/
nav: true
nav-order: 7

title: Compet&shy;ition
long-title: Win a romantic escape to gorgeous Heidelberg...
intro: Here’s your chance to win an unmissable romantic getaway to one of Germany’s most beautiful towns – picture-perfect Heidelberg. Sat next to a sparkling river, watched over by a romantic castle and surrounded by dark green forest glades, Heidelberg has been a popular beauty spot for centuries. Now you too can explore its pretty cobbled streets, with incredible romantic experiences included for a truly spellbinding getaway.
enter-cta: Enter Now


features:

  - id: the-stay
    title: The Stay
    description: You’ll spend three nights at the Crowne Plaza Heidelberg, with flights included. As you arrive, you’ll be treated to dinner at the hotel, before a good night’s rest in the well-appointed rooms. Enjoy breakfast each morning before exploring Heidelberg’s unique charms.
    image-attribution: (c) Crowne Plaza Heidelberg City Centre.jpg

  - id: a-unique-tour
    title: A Unique Tour
    description: On your first full day, some real treats await. Enjoy a private guided tour through Heidelberg’s old town. Then, hop into a Piaggio Ape for a rather special tour of the castle grounds. Afterwards, indulge in an exclusive reception at the castle, where German sparkling wines accompany brilliant views over the town and surrounding hills.
    image-attribution: (c) Heidelberger Schlossgastronomie.jpg

  - id: michelin-dining
    title: Michelin Dining
    description: "To round off your day, head to the castle’s Michelin restaurant: the illustrious Scharffs Schlossweinstube. Greeted by the head chef on arrival, you’ll be treated to a five-course, candlelit dinner. The following day, you and your loved one will have some personal time to explore Heidelberg at your own pace, with a HeidlebergCard in pocket; free public transport and unique savings in shops and restaurants to take advantage of."
    image-attribution: (c) Heidelberger Schlossgastronomie1.jpg

competition-form:
  id: comp
  post-url: "#getFormUrl"
  expiry-date: 2050-01-01
  fields:
    - id: name
      type: text
      label: Name
      required: true
    - id: email
      type: email
      label: Email
      required: true
    - id: qualify
      type: radio
      label: Are you a UK resident and over the age of 18?
      required: true
      options:
        - id: qualify-true
          label: 'Yes'
          value: 'yes'
        - id: qualify-false
          label: 'No'
          value: 'no'
          invalid: true
    - id: opt-in
      type: radio
      label: Would you like to receive emails from our Partner brand?
      required: true
      options:
        - id: opt-in-true
          label: 'Yes'
          value: 'yes'
        - id: opt-in-false
          label: 'No'
          value: 'no'
    - id: storytime
      type: text-long
      label: Tell us about your favourite travel experience
      required: true
    - id: eggs
      type: select
      label: What is your favourite continent?
      required: true
      options:
        - label: Africa
          value: africa
        - label: Antarctica
          value: antarctica
        - label: Asia
          value: asia
        - label: Europe
          value: europe
        - label: North America
          value: north-america
        - label: Oceania
          value: oceania
        - label: South America
          value: south-america
    - id: contact
      type: checkbox
      label: Do you have a preference on how we should contact you?
      required: true
      options:
        - id: contact-email
          label: Email
          value: email
        - id: contact-post
          label: Post
          value: post
        - id: contact-phone
          label: Phone
          value: phone
    - id: week
      type: select
      label: What is your favourite day of the week?
      options:
        - label: Monday
          value: mon
        - label: Tuesday
          value: tue
        - label: Wednesday
          value: wed
        - label: Thursday
          value: thur
        - label: Friday
          value: fri
        - label: Saturday
          value: sat
        - label: Sunday
          value: sun
  submit: Submit Entry
  terms: >
    By submitting your entry, you agree to the <a href="#" class="js-open-modal link--underlined" data-open-modal="competition-terms">terms and conditions</a> of this competition
---