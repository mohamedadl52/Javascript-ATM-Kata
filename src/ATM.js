var ATM = (function() {
    var ATM = function() {}
    ATM.prototype = {
        withdraw: function(amount) {
        	var withdrawn = 0;
        	if(this.bank.balance() > amount) { 
        		withdrawn = amount;
			}
			$('input#cashDrawer').val(withdrawn);
			return withdrawn;
        }
    }
    return {
        create: function() {
            return new ATM();
        }
    }
})();

$(function() {
	$('input#withdraw').click(function() {
		ATM.create().withdraw();
	});
});
