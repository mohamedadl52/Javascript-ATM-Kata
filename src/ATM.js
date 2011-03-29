var Bank = (function() {
	var Bank = function() {}
	Bank.prototype = {
		hasAccount: function(accountNumber, pin) {
			return (this.accounts[accountNumber] == pin);
		},
		accounts: {'1234567890' : '1234', 
				   '0987654321' : '1111'},
		balances: {'1234567890' : '50',
				   '0987654321' : '50'}, 
		setBalance: function(amount, accountNumber, pin) {
			this.balances[accountNumber] = amount;
		},
    	checkBalance: function(accountNumber, pin) {
    		return this.balances[accountNumber];
		},
		withdraw: function(amount, accountNumber, pin) {
			var balance = this.checkBalance(accountNumber, pin);
			if(balance > amount && this.hasAccount(accountNumber, pin)) {  
				balance -= amount;
				this.setBalance(balance, accountNumber, pin);
				return amount;
			}
			return 0;
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
			var withdrawn = this.bank.withdraw(amount, accountNumber, pin);
			$('input#cashDrawer').val(withdrawn);
			$('#accountBalance').text(this.checkBalance(accountNumber, pin));
			return withdrawn;
        },
    	checkBalance: function(accountNumber, pin) {
    		return this.bank.checkBalance(accountNumber, pin);
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

