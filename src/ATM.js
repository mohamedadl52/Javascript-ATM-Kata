var Bank = (function() {
	var Bank = function() {}
	Bank.prototype = {
		hasAccount: function(accountNumber, pin) {
			return (this.accounts[accountNumber] == pin);
		},
		accounts: {'1234567890' : '1234', 
				   '0987654321' : '1111'},
		balance: 20, 
		setBalance: function(amount, accountNumber, pin) {
			this.balance = amount;
		},
		withdraw: function(amount, accountNumber, pin) {
			this.balance -= amount;
			return amount;
		}
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
        	var balance = this.checkBalance(accountNumber, pin);
        	if(this.bank.hasAccount(accountNumber, pin) && 
				balance > amount) { 
        		withdrawn = this.bank.withdraw(amount, accountNumber, pin);
			}
			$('input#cashDrawer').val(withdrawn);
			$('#accountBalance').text(this.checkBalance(accountNumber, pin));
			return withdrawn;
        },
    	checkBalance: function(accountNumber, pin) {
    		return this.bank.balance;
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

