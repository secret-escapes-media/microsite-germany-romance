document.addEventListener('DOMContentLoaded', function() {
  // general randomise array function
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // get baseurl for all site links
  const baseurl = window.location.pathname.split('/', 4).join('/');

  // data file
  const data = {
    cities: [
      {
        id: 'baden-baden',
        name: 'Baden-Baden',
        result: {
          image: `${baseurl}/_assets/img/img.jpg`,
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus hic asperiores similique cum dignissimos impedit explicabo nulla sit.',
          links: {
            offer:
              'https://www.secretescapes.com/search/search?query=Baden-Baden',
            more: `${baseurl}/wellness/#baden-baden`
          }
        }
      },
      {
        id: 'heidelberg',
        name: 'Heidelberg',
        result: {
          image: `${baseurl}/_assets/img/img.jpg`,
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus hic asperiores similique cum dignissimos impedit explicabo nulla sit.',
          links: {
            offer:
              'https://www.secretescapes.com/search/search?query=Heidelberg',
            more: `${baseurl}/classic/#heidelberg`
          }
        }
      },
      {
        id: 'nuremberg',
        name: 'Nuremberg',
        result: {
          image: `${baseurl}/_assets/img/img.jpg`,
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus hic asperiores similique cum dignissimos impedit explicabo nulla sit.',
          links: {
            offer:
              'https://www.secretescapes.com/search/search?query=Nuremberg',
            more: `${baseurl}/culture/#nuremberg`
          }
        }
      },
      {
        id: 'aschaffenburg',
        name: 'Aschaffenburg',
        result: {
          image: `${baseurl}/_assets/img/img.jpg`,
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus hic asperiores similique cum dignissimos impedit explicabo nulla sit.',
          links: {
            offer:
              'https://www.secretescapes.com/search/search?query=Aschaffenburg',
            more: `${baseurl}/secret/#aschaffenburg`
          }
        }
      }
    ]
  };

  // create all elements
  const target = document.querySelector('.js-game');
  const container = document.createElement('div');
  const intro = document.createElement('div');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const game = document.createElement('div');
  const bottom = document.createElement('div');
  const button = document.createElement('a');

  // add all classes & atrributes
  container.classList = 'container container--xxl vpad--xxl';
  intro.classList = 'text--center';
  title.classList = 'title title--md';
  description.classList = 'width width--lg text--xxl';
  game.classList =
    'space--md row row--constant-6-6 row--sm-4-4-4 row--lg-3-3-3-3 row--no-gutters';
  bottom.classList = 'text--center space--lg';
  button.classList = 'btn btn--lg btn--orange';
  button.setAttribute('href', '#');

  // add all text
  title.innerText = 'Where is your romantic Germany?';
  description.innerText =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus hic asperiores similique cum dignissimos impedit explicabo nulla sit.';
  button.innerText = 'Submit Images';

  // combine all elments into the final html
  container.append(intro, game, bottom);
  intro.append(title, description);
  bottom.append(button);
  target.append(container);

  // create all of the images for the first step
  const imageWrap = document.createElement('div');
  const image = document.createElement('div');
  imageWrap.classList = 'col';
  image.classList = 'js-image-thing bg-img bg-img--1-1 text--white';

  function buildImageGrid(array, step, amount) {
    // store html before page input
    const html = [];
    // loop through each city and put out the requested amount of images
    array.map(city => {
      for (let i = 0; i < amount; i++) {
        const newImageWrap = imageWrap.cloneNode();
        const newImage = image.cloneNode();
        newImage.innerText = `${city.name} ${step} 0${i + 1}`;
        newImage.setAttribute(
          'style',
          `background-image: url('${baseurl}/_assets/img/game/${
            city.id
          }/${step}-0${i + 1}.jpg')`
        );
        newImage.setAttribute('data-city', city.id);
        newImage.classList.add('text--white', 'text--xxl');
        newImageWrap.append(newImage);
        html.push(newImageWrap);
      }
    });
    // randomise the order and output to page
    shuffle(html);
    html.map(el => game.append(el));
  }

  // create the first step of images
  buildImageGrid(data.cities, 'step01', 3);

  // which two cities are the most common
  function findChosenCities(choices) {
    const cityCount = choices.reduce((tally, choice) => {
      if (!tally[choice]) {
        tally[choice] = 1;
      } else {
        tally[choice] = tally[choice] + 1;
      }
      return tally;
    }, {});
    // get the top 2 results & return the data object for each city
    return Object.entries(cityCount)
      .sort((a, b) => b[1] - a[1])
      .splice(0, 2)
      .reduce((results, item) => {
        results.push(data.cities.find(city => city.id === item[0]));
        return results;
      }, []);
  }

  // select images function

  // submit images function
  button.addEventListener('click', e => {
    e.preventDefault();
    if (!data.selection) {
      // temp for selecting rando images
      var myFirstSelection = [];
      document
        .querySelectorAll('.js-image-thing')
        .forEach(thang => myFirstSelection.push(thang.dataset.city));
      myFirstSelection.splice(5);
      // actual code
      data.selection = [];
      data.selection.push(myFirstSelection);
      data.shortlist = findChosenCities(myFirstSelection);
      // remove current image grid and add in step2
      game.innerHTML = null;
      title.innerText = 'Choose another 5 images';
      title.classList.add('title--xs');
      description.remove();
      buildImageGrid(data.shortlist, 'step02', 6);
    } else {
      // temp for selecting rando images
      var mySecondSelection = [];
      document
        .querySelectorAll('.js-image-thing')
        .forEach(thang => mySecondSelection.push(thang.dataset.city));
      mySecondSelection.splice(5);
      // actual code
      data.selection.push(mySecondSelection);
      data.final = findChosenCities(mySecondSelection)[0];
      // would be good to save this final result on local storage, that way if people navigate away they can still get their resilt
      // could even put in

      // remove current image grid and show the result
      game.remove();
      container.innerHTML = null;
      container.innerHTML = `
      <div class="width width--xl text--center">
        <h3 class="sub-title">You should be heading for...</h3>
        <h2 class="title title--xl">${data.final.name}</h2>
        <div class="space--lg"></div>
        <div class="bg-img bg-img--16-9" style="background-image:url('${data.final.result.image}')"></div>
        <div class="space--sm"></div>
        <p class="width width--lg text--xxl">${data.final.result.description}</p>
        <div class="space--md"></div>
        <div>
          <a href="${data.final.result.links.offer}" class="btn btn--orange">See ${data.final.name} offers</a>
        </div>
        <div class="space--sm">
          <a href="${data.final.result.links.more}" class="btn btn--outline btn--outline-orange btn--sm">Find Out More</a>
        </div>
      </div>
      `;
    }
    // // reset the scroll position to the top of the game
    // document.documentElement.scrollTop = container.offsetTop;
  });
});
