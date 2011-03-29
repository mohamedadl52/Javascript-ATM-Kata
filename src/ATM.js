var Bank = (function() {
	var Bank = function() {}
	Bank.prototype = {
		hasAccount: function(accountNumber, pin) {
			return (accountNumber == '1234567890' && pin == '1234') ||
        			(accountNumber == '0987654321' && pin == '1111');
		},
		balance: 20
	}
	return {
		create: function() {
			return new Bank();
		}
	}
})();

var ATM = (function() {
    var ATM = function() {}
    ATM.prototype = {
        withdraw: function(amount, accountNumber, pin) {
        	var withdrawn = 0;
        	if((this.bank.hasAccount(accountNumber, pin)) && 
        		this.bank.balance > amount) { 
        		withdrawn = amount;
        		this.bank.balance -= amount;
			}
			$('input#cashDrawer').val(withdrawn);
			$('#accountBalance').text(this.bank.balance);
			return withdrawn;
        }
    }
    return {
        create: function() {
			var atm = new ATM();
			atm.bank = Bank.create();
			$('input#withdraw').click(function() {
				atm.withdraw($('input#amount').val(),
					$('input#accountNumber').val(),
					$('input#PIN').val());
			});
            return atm;
        }
    }
})();

