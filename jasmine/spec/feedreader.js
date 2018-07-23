// Wait for DOM to load before running tests
$(function() {
  // Test suite for RSS Feeds
  describe('RSS Feeds', function() {
    // Test that the allFeeds list is defined, and
    // the length is not 0
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Test that every feed has a url defined, and it
    // isn't blank.
    it('have urls', function() {
      allFeeds.map(function(a) {
        expect(a.url).toBeDefined();
        expect(a.url.length).not.toBe(0);
      });
    });

    // Test that every feed has a name defined,
    // and it isn't blank.
    it('have names', function() {
      allFeeds.map(function(a) {
        expect(a.name).toBeDefined();
        expect(a.name.length).not.toBe(0);
      });
    });
  });

  // Test suite for the menu
  describe('The menu', function() {
    // Test that the menu is hidden by default,
    // by checking the css
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden'));
      expect($('.menu-hidden .slide-menu').css('transform')).toEqual('matrix(1, 0, 0, 1, -192, 0)');
    });

    // Test suite for when the menu is clicked
    describe('When the menu icon is clicked', function() {

      // Before every test in this suite, trigger a
      // click event on the menu
      beforeEach(function(done) {
        $('.menu-icon-link').trigger('click');
        setTimeout(function() {
          done();
        }, 250);
      });

      // Test that the menu is visible when clicked
      it('it becomes visible', function() {
        expect($('.slide-menu').css('transform')).toEqual('matrix(1, 0, 0, 1, 0, 0)');
      });

      // Test that the menu hides when it is clicked again
      it('it hides on a subsequent click', function() {
        expect($('.slide-menu').css('transform')).toEqual('matrix(1, 0, 0, 1, -192, 0)');
      });
    });
  });

  // Test suite for the feed's initial entries
  describe('Initial entries', function() {

    // Run loadFeed before the test in this suite
    // and pass it the jasmine done() callback
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    // After loadFeed runs, make sure that there is
    // at least one entry
    it('has at least one entry', function() {
      expect($('.feed').has('.entry').length).toBeGreaterThan(0);
    });
  });

  // Test suite for new feeds
  describe('New feed selection', function() {

    // Defining a variable to hold the text
    // of an initial entry
    let entryOld;

    // load the first feed before the test
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    // capture the text from the first entry in the
    // feed, then load a new feed
    beforeEach(function(done) {
      entryOld = $('.feed .entry-link:first-child').text().trim();
      loadFeed(1, done);
    });

    // Test that the first entry from the new feed isn't the same
    // as the original
    it('changes content when loaded', function() {
      const entryNew = $('.feed .entry-link:first-child').text().trim();
      expect(entryOld !== entryNew).toEqual(true);
      expect(entryOld.length).not.toEqual(0);
      expect(entryNew.length).not.toEqual(0);
    });
  });
}());
