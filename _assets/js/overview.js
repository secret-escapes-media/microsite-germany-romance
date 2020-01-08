document.addEventListener('DOMContentLoaded', function() {
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  General functions
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // general randomise array function
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  global data & variables
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // get baseurl for all site links
  const baseurl = window.location.pathname.split('/', 4).join('/');
  // root game element
  const game = document.querySelector('.js-game');
  // special class names
  const imageSelectClass = 'js-game-image';
  const resetbtnClass = 'js-game-reset';
  const submitbtnClass = 'js-game-submit';
  const selectedClass = 'is-selected';
  const maxSelectedClass = 'has-limit';
  const localStorageId = 'rig-game-result';

  // data file
  const data = {
    cities: [
      {
        id: 'baden-baden',
        name: 'Baden-Baden',
        result: {
          image: `${baseurl}/_assets/img/content/indulgent/baden-baden.jpg`,
          description:
            'Your indulgent getaway awaits, in this most famous of spa towns. Bask in the thermal waters before heading out for a spot of fine dining...',
          links: {
            more: `${baseurl}/indulgent/#baden-baden`
          }
        }
      },
      {
        id: 'heidelberg',
        name: 'Heidelberg',
        result: {
          image: `${baseurl}/_assets/img/content/classic/heidelberg.jpg`,
          description:
            'It doesn’t get prettier than Heidelberg. Captivating scenes await, coupled with charm in abundance.',
          links: {
            more: `${baseurl}/classic/#heidelberg`
          }
        }
      },
      {
        id: 'nuremberg',
        name: 'Nuremberg',
        result: {
          image: `${baseurl}/_assets/img/content/artistic/nuremberg.jpg`,
          description:
            'A city brimming with history and culture makes for a truly captivating escape.',
          links: {
            more: `${baseurl}/artistic/#nuremberg`
          }
        }
      },
      {
        id: 'aschaffenburg',
        name: 'Aschaffen&shy;burg',
        result: {
          image: `${baseurl}/_assets/img/content/secret/aschaffenburg.jpg`,
          description:
            'A pretty riverside hideaway, delight in the picture-perfect parks and palaces of this gorgeous town...',
          links: {
            more: `${baseurl}/secret/#aschaffenburg`
          }
        }
      }
    ]
  };

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  build game content
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // ---------------------------------------------------------------------------
  // create generic image element for cloning
  // ---------------------------------------------------------------------------
  const col = document.createElement('div');
  const imageWrap = document.createElement('div');
  const image = document.createElement('div');
  col.classList.add('col');
  imageWrap.classList.add(imageSelectClass, 'game-image');
  imageWrap.setAttribute('tabindex', '0');
  image.classList.add('bg-img', 'bg-img--1-1');

  // ---------------------------------------------------------------------------
  // create image grid for each step of the game
  // ---------------------------------------------------------------------------
  function buildImageGrid(array, step, amount) {
    const html = []; // store html before page input
    array.map(city => {
      // loop through each city and put out the requested amount of images
      for (let i = 0; i < amount; i++) {
        const newCol = col.cloneNode();
        const newImageWrap = imageWrap.cloneNode();
        const newImage = image.cloneNode();
        newImage.setAttribute(
          'style',
          `background-image: url('${baseurl}/_assets/img/game/${
            city.id
          }/${step}-0${i + 1}.jpg')`
        );
        newImageWrap.setAttribute('data-city', city.id);
        newImageWrap.append(newImage);
        newCol.append(newImageWrap);
        html.push(newCol);
      }
    });
    shuffle(html); // randomise the order
    return html.map(item => item.outerHTML.toString()).join(''); // print out entire html
  }

  // ---------------------------------------------------------------------------
  // build first step of game
  // ---------------------------------------------------------------------------
  function buildStep01() {
    game.innerHTML = `
      <div class="container container--xxl vpad--xxl">
        <div class="text--center">
          <h2 class="title title--lg">Find your perfect romantic hideaway...</h2>
          <p class="width width--lg text--xxl">Not sure where to head? We’ve made it super simple; simply click on the images that you think match up to your perfect romantic escape, and we’ll do the rest!</p>
          <p class="width width--lg text--xxl text--bold">Choose five images</p>
        </div>
        <div class="space--md row row--constant-6-6 row--md-4-4-4 row--lg-3-3-3-3 row--no-gutters">
          ${buildImageGrid(data.cities, 'step01', 3)}
        </div>
        <div class="game-submit text--center space--lg"><a class="${submitbtnClass} btn btn--lg btn--red" href="#0">Submit Images</a></div>
      </div>
    `;
    // add event listeners for each image
    [...document.querySelectorAll(`.${imageSelectClass}`)].map(item =>
      imageSelect(item, 'step01')
    );
    // add event for submit button
    document
      .querySelector(`.${submitbtnClass}`)
      .addEventListener('click', e => {
        e.preventDefault();
        data.shortlist = findChosenCities(data.selection['step01']);
        goToStep('step02');
        resetGameScroll();
      });
  }

  // ---------------------------------------------------------------------------
  // build second step of game
  // ---------------------------------------------------------------------------
  function buildStep02() {
    game.innerHTML = `
      <div class="container container--xxl vpad--xxl">
        <div class="text--center">
          <p class="width width--lg text--xxl text--bold">Choose another 5 images</p>
        </div>
        <div class="space--md row row--constant-6-6 row--md-4-4-4 row--lg-3-3-3-3 row--no-gutters">
          ${buildImageGrid(data.shortlist, 'step02', 6)}
        </div>
        <div class="game-submit text--center space--lg"><a class="${submitbtnClass} btn btn--lg btn--red" href="#0">Submit Images</a></div>
      </div>
    `;
    // add event listeners for each image
    [...document.querySelectorAll(`.${imageSelectClass}`)].map(item =>
      imageSelect(item, 'step02')
    );
    // add event for submit button
    document
      .querySelector(`.${submitbtnClass}`)
      .addEventListener('click', e => {
        e.preventDefault();
        data.final = findChosenCities(data.selection['step02'])[0];
        window.localStorage.setItem(localStorageId, data.final.id);
        goToStep('result');
        resetGameScroll();
      });
  }

  // ---------------------------------------------------------------------------
  // build final result of game
  // ---------------------------------------------------------------------------
  function buildResult() {
    game.innerHTML = `
      <div class="container container--xxl vpad--xxl">
        <div class="width width--xl text--center">
          <h3 class="sub-title sub-title--sm">You should be heading for...</h3>
          <h2 class="title title--xxl">${data.final.name}</h2>
          <p class="width width--lg text--xxl">${data.final.result.description}</p>
          <div class="vpad--xs">
            <div class="bg-img bg-img--4-3 bg-img--md-3-2 bg-img--xl-16-9" style="background-image:url('${data.final.result.image}')">
              <a href="${data.final.result.links.more}" class="bg-img__link"></a>
            </div>
          </div>
          <div class="inline-buttons space--xs">
            <a href="${data.final.result.links.more}" class="btn btn--red">Find Out More</a>
            <a href="#0" class="${resetbtnClass} btn btn--outline btn--outline-red btn--sm">Choose again?</a>
          </div>
        </div>
      </div>
    `;
    // add event for reset button
    document
      .querySelector(`.${resetbtnClass}`)
      .addEventListener('click', function(e) {
        e.preventDefault();
        resetGame();
      });
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  game functions
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // ---------------------------------------------------------------------------
  // find which two cities are the most common in user selection
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // show each step of the game and populate
  // ---------------------------------------------------------------------------
  function goToStep(stepName) {
    // build each step
    switch (stepName) {
    case 'result':
      buildResult();
      break;
    case 'step01':
      buildStep01();
      break;
    case 'step02':
      buildStep02();
      break;
    }
    // remove global class for image selection limit
    game.classList.remove(maxSelectedClass);
  }

  // ---------------------------------------------------------------------------
  // reset entire game
  // ---------------------------------------------------------------------------
  function resetGame() {
    // clean data & html
    delete data.final;
    delete data.shortlist;
    delete data.selection;
    window.localStorage.removeItem(localStorageId);
    // show first step and scroll
    goToStep('step01');
    resetGameScroll();
  }

  // ---------------------------------------------------------------------------
  // reset game scroll position
  // ---------------------------------------------------------------------------
  function resetGameScroll() {
    const el = document.scrollingElement || document.documentElement;
    el.scrollTop = game.offsetTop;
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  game interactions
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // ---------------------------------------------------------------------------
  // image selection
  // ---------------------------------------------------------------------------
  function imageSelect(el, step) {
    function selectHandler(e) {
      e.preventDefault();
      const city = el.dataset.city;
      const isSelected = el.classList.contains(selectedClass);
      const removeImage = () => {
        const arrPos = data.selection[step].indexOf(city);
        data.selection[step].splice(arrPos, 1);
        el.classList.remove(selectedClass);
      };
      // create arrays to track selected images
      if (!data.selection) data.selection = [];
      if (!data.selection[step]) data.selection[step] = [];
      // only allow 5 selected images
      if (data.selection[step].length === 5) {
        if (isSelected) removeImage();
      } else {
        // is image already selected?
        if (isSelected) {
          removeImage();
        } else {
          data.selection[step].push(city);
          el.classList.add(selectedClass);
        }
      }
      if (data.selection[step].length === 5) {
        game.classList.add(maxSelectedClass);
        document.querySelector(`.${submitbtnClass}`).focus();
      } else {
        game.classList.remove(maxSelectedClass);
      }
    }
    // add enter key event
    el.addEventListener('keydown', e => {
      if (e.code === 'Enter') selectHandler(e);
    });
    // add click event
    el.addEventListener('click', e => selectHandler(e));
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  initialise game
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  const previousResult = window.localStorage.getItem(localStorageId);
  if (previousResult) {
    data.final = data.cities.find(item => item.id === previousResult); // capture results in global data
    goToStep('result');
  } else {
    goToStep('step01');
  }
});
