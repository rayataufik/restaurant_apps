/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const { I } = inject();
const { assert } = require('chai');

Feature('Favoriting Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurant', async ({ I }) => {
  I.waitForElement('#restaurant-list');
  I.dontSeeElement('#resto-item');
  I.see('Tidak ada restaurant untuk ditampilkan', '#resto-item__not__found');
});

Scenario('favoriting one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('#resto-item', 10);
  const firstResto = locate('#resto-title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.waitForElement('#favoriteButton', 10);
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('#resto-item', 10);
  const favoritedRestoTitle = await I.grabTextFrom('#resto-title');
  I.see(firstRestoTitle, '#resto-title');
});

Scenario('unfavoriting one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('#resto-item', 5);
  const firstResto = locate('#resto-title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  I.waitForElement('#favoriteButton', 10);
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('#resto-item a', 5);
  const firstRestolike = locate('#resto-title a').first();
  const favoritedRestoTitle = await I.grabTextFrom(firstRestolike);
  assert.strictEqual(firstRestoTitle, favoritedRestoTitle);

  I.click(firstRestolike);
  I.waitForElement('#favoriteButton', 10);
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('#resto-item__not__found', 5);
  const onFav = await I.grabTextFrom('#resto-item__not__found');
  assert.strictEqual(onFav, 'Tidak ada restaurant untuk ditampilkan');
});
