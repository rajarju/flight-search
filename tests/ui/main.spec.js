describe('Main', function() {
  describe('window.app', function() {
    beforeEach(function() {
      var DOMContentLoaded_event = document.createEvent("Event")
      DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
      window.document.dispatchEvent(DOMContentLoaded_event);
    });
    it('should create window.app', function() {
      expect(window.app).not.toBe(undefined);
    });
  });
});
