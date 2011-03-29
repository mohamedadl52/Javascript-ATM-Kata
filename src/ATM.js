var ATM = (function() {
    var ATM = function() {}
    ATM.prototype = {
        withdraw: function() {

        }
    }
    return {
        create: function() {
            return new ATM();
        }
    }
})();

$(function() {
	$('input#cashDrawer').val(10);
});
