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

  // root game element
  const game = document.querySelector('.js-game');

  // special class names
  const imageSelectClass = 'js-game-image';
  const selectedClass = 'is-selected';
  const maxSelectedClass = 'has-limit';

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  build game content
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // ---------------------------------------------------------------------------
  // create generic image element for cloning
  // ---------------------------------------------------------------------------
  const imageWrap = document.createElement('div');
  const image = document.createElement('div');
  imageWrap.classList.add('col');
  image.classList.add(
    imageSelectClass,
    'game-image',
    'bg-img',
    'bg-img--1-1',
    'text--white',
    'text--xxl'
  );
  image.setAttribute('tabindex', '0');

  // ---------------------------------------------------------------------------
  // create image grid for each step of the game
  // ---------------------------------------------------------------------------
  function buildImageGrid(array, step, amount) {
    const html = []; // store html before page input
    array.map(city => {
      // loop through each city and put out the requested amount of images
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
        newImageWrap.append(newImage);
        html.push(newImageWrap);
      }
    });
    shuffle(html); // randomise the order
    return html.map(item => item.outerHTML.toString()).join(''); // print out entire html
  }

  // ---------------------------------------------------------------------------
  // ........
  // ---------------------------------------------------------------------------

  function buildResult() {
    game.innerHTML = null;
    game.innerHTML = `
      <div class="container container--xxl vpad--xxl">
        <div class="width width--xl text--center">
          <h3 class="sub-title sub-title--sm">You should be heading for...</h3>
          <h2 class="title title--xxxl">${data.final.name}</h2>
          <div class="space--lg"></div>
          <div class="bg-img bg-img--16-9" style="background-image:url('${data.final.result.image}')"></div>
          <div class="space--sm"></div>
          <p class="width width--lg text--xxl">${data.final.result.description}</p>
          <div class="space--md"></div>
          <div>
            <a href="${data.final.result.links.offer}" class="btn btn--red">See ${data.final.name} offers</a>
          </div>
          <div class="space--sm">
            <a href="${data.final.result.links.more}" class="btn btn--outline btn--outline-red btn--sm">Find Out More</a> <a href="#" class="js-game-reset btn btn--outline btn--outline-red btn--sm">Choose again?</a>
          </div>
        </div>
      </div>
    `;
    resetGameButton();
  }

  function buildStep01() {
    game.innerHTML = null;
    game.innerHTML = `
      <div class="container container--xxl vpad--xxl">
        <div class="text--center">
          <h2 class="title title--xl">Where is your romantic Germany?</h2>
          <p class="width width--lg text--xxl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus hic asperiores similique cum dignissimos impedit explicabo nulla sit.</p>
          <p class="width width--lg text--xxl text--bold">Choose 5 images</p>
        </div>
        <div class="space--md row row--constant-6-6 row--sm-4-4-4 row--lg-3-3-3-3 row--no-gutters">
          ${buildImageGrid(data.cities, 'step01', 3)}
        </div>
      </div>
    `;
    // add event listeners here
  }

  const content = {
    step02: `
      <div class="container container--xxl vpad--xxl">
        <div class="text--center">
          <p class="width width--lg text--xxl text--bold">Choose another 5 images</p>
        </div>
        <div class="space--md row row--constant-6-6 row--sm-4-4-4 row--lg-3-3-3-3 row--no-gutters"></div>
      </div>
    `,
    submit: `
      <div class="game-submit text--center space--lg"><a class="btn btn--lg btn--red" href="#">Submit Images</a></div>
    `
  };

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  game state changes
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
    switch (stepName) {
    case 'result':
      buildResult();
      break;
    case 'step01':
      buildStep01();
      break;
    default:
      console.log('dis a default');
    }

    // create a marker for which step of the game is current
    game.setAttribute('data-step', stepName);

    // console.log(game);

    // so in this context step name is the string 'result'

    // build all of the dynamic bits that are needed
    // grab the step layout html
    // add in the dynamic bits to the layout
    // add the final layout to the page
    // add in all of the event listeners and such
  }

  // ---------------------------------------------------------------------------
  // reset entire game
  // ---------------------------------------------------------------------------
  function resetGame() {
    // clean data & html
    delete data.final;
    delete data.shortlist;
    delete data.selection;
    // show first step and scroll
    goToStep('step01');
    resetGameScroll();
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
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const city = this.dataset.city;
      const isSelected = this.classList.contains(selectedClass);
      const removeImage = () => {
        const arrPos = data.selection[step].indexOf(city);
        data.selection[step].splice(arrPos, 1);
        this.classList.remove(selectedClass);
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
          this.classList.add(selectedClass);
        }
      }
      if (data.selection[step].length === 5) {
        target.classList.add(maxSelectedClass);
      } else {
        target.classList.remove(maxSelectedClass);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // submit selected images
  // ---------------------------------------------------------------------------
  // button.addEventListener('click', e => {
  //   e.preventDefault();
  //   const currentStep = game.dataset.step;
  //   if (currentStep === 'step01') {
  //     // find winners, clear html, create step 2 images
  //     data.shortlist = findChosenCities(data.selection[currentStep]);
  //     game.innerHTML = null;
  //     intro.append(secondTitle);
  //     title.remove();
  //     description.remove();
  //     instruction.remove();
  //     target.classList.remove(maxSelectedClass);
  //     buildImageGrid(data.shortlist, 'step02', 6);
  //   } else if (currentStep === 'step02') {
  //     // find winner, clear html, show result
  //     data.final = findChosenCities(data.selection[currentStep])[0];
  //     window.localStorage.setItem('rig-game-result', data.final.id);

  //     // would be good to save this final result on local storage, that way if people navigate away they can still get their resilt

  //     // remove current image grid and show the result
  //     target.classList.remove(maxSelectedClass);
  //     game.remove();
  //     container.innerHTML = null;
  //     container.innerHTML = `
  //     <div class="width width--xl text--center">
  //       <h3 class="sub-title sub-title--sm">You should be heading for...</h3>
  //       <h2 class="title title--xxxl">${data.final.name}</h2>
  //       <div class="space--lg"></div>
  //       <div class="bg-img bg-img--16-9" style="background-image:url('${data.final.result.image}')"></div>
  //       <div class="space--sm"></div>
  //       <p class="width width--lg text--xxl">${data.final.result.description}</p>
  //       <div class="space--md"></div>
  //       <div>
  //         <a href="${data.final.result.links.offer}" class="btn btn--red">See ${data.final.name} offers</a>
  //       </div>
  //       <div class="space--sm">
  //         <a href="${data.final.result.links.more}" class="btn btn--outline btn--outline-red btn--sm">Find Out More</a> <a href="#" class="js-game-reset btn btn--outline btn--outline-red btn--sm">Choose again?</a>
  //       </div>
  //     </div>
  //     `;
  //     resetGame();
  //   }
  //   resetGameScroll();
  // });

  function resetGameButton() {
    document
      .querySelector('.js-game-reset')
      .addEventListener('click', function(e) {
        e.preventDefault();
        resetGame();
      });
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  initialise game
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // so no more functions, this is the heart of the code that fucks with all of
  // the moving parts. This is the run time, statements not functions

  // the page loads
  // the game element is already found

  const previousResult = window.localStorage.getItem('rig-game-result');
  if (previousResult) {
    data.final = data.cities.find(item => item.id === previousResult); // capture results in global data

    // goToStep('step01');
    goToStep('result'); // show result step
  } else {
    // show first step
  }

  // has there been a previous result?
  // look in local storage
  // show result page if so
  // show first step if not

  // // add all elements for the first step of the game
  // function createFirstStep() {
  //   // // combine all elments into the final html
  //   // container.append(intro, game, bottom);
  //   // intro.append(title, description, instruction);
  //   // bottom.append(button);
  //   // target.append(container);
  //   // create the first step of images
  //   buildImageGrid(data.cities, 'step01', 3);
  // }
  //  // initalise the game
  // // this is where it needs to check the browser if there is an answer
  // if (window.localStorage.getItem('rig-game-result')) {
  //   console.log(
  //     data.cities.find(
  //       item => item.id === window.localStorage.getItem('rig-game-result')
  //     )
  //   );
  // } else {
  //   createFirstStep();
  // }

  // create all elements
  // const container = document.createElement('div');
  // const intro = document.createElement('div');
  // const title = document.createElement('h2');
  // const secondTitle = document.createElement('h2');
  // const description = document.createElement('p');
  // const instruction = document.createElement('p');
  // const game = document.createElement('div');
  // const bottom = document.createElement('div');
  // const button = document.createElement('a');

  // // add all classes & atrributes
  // container.classList.add('container', 'container--xxl', 'vpad--xxl');
  // intro.classList.add('text--center');
  // title.classList.add('title', 'title--xl');
  // secondTitle.classList.add('title', 'title--lg');
  // description.classList.add('width', 'width--lg', 'text--lg');
  // instruction.classList.add('width', 'width--lg', 'text--xxl', 'text--bold');
  // game.classList.add(
  //   'space--md',
  //   'row',
  //   'row--constant-6-6',
  //   'row--sm-4-4-4',
  //   'row--lg-3-3-3-3',
  //   'row--no-gutters'
  // );
  // bottom.classList.add('game-submit', 'text--center', 'space--lg');
  // button.classList.add('btn', 'btn--red');
  // button.setAttribute('href', '#');

  // // add all text
  // title.innerText = 'Where is your romantic Germany?';
  // secondTitle.innerText = 'Choose another 5 images';
  // description.innerText =
  //   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatibus hic asperiores similique cum dignissimos impedit explicabo nulla sit.';
  // instruction.innerText = 'Choose 5 images';
  // button.innerText = 'Submit Images';

  // reset window scroll position so title is always visible
  function resetGameScroll() {
    document.documentElement.scrollTop = game.offsetTop;
  }
});
