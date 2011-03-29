describe("ATM Story Tests", function(){
    beforeEach(function() {
    	$.jasmine.inject(
			'<ul id="atmMachine">' +
				'<li><label for="accountNumber">Account Number:&#160;</label>' +
					'<input type="text" name="accountNumber" id="accountNumber" maxlength="10"/></li>' +
				'<li><label for="PIN">PIN:&#160;</label>' +
					'<input type="password" name="PIN" id="PIN" maxlength="4" /></li>' +
				'<li><label for="amount">Amount:&#160;</label>' +
					'<input type="text" name="amount" id="amount" /></li>' +
				'<li><input type="submit" id="withdraw" value="Withdraw Money" />' +
				'</li>' +
				'<li>Current Balance: <span id="accountBalance"></span></li>' +
				'<li><label for="cashDrawer">Cash Drawer:&nbsp;</label>' +
					'<input id="cashDrawer" name="cashDrawer" type="text" /></li>' +
			'</ul>' 
		);
		var atm = ATM.create();
		atm.bank.balance = 100;
    });
    describe("Judy withdraws money", function() {
		it("Allows Judy to withdraw money when she has a balance available", function() {
			$('input#accountNumber').val('1234567890');
			$('input#PIN').val('1234');
			$('input#amount').val(10);
			$('input#withdraw').click();
			expect($('#cashDrawer').val()).toEqual('10');
		});
		it("Prevents Judy from withdrawing money when she doesn't have it available", function() {
			$('input#accountNumber').val('1234567890');
			$('input#PIN').val('1234');
			$('input#amount').val(110);
			$('input#withdraw').click();
			expect($('#cashDrawer').val()).toEqual('0');
		});
		it("Prevents Judy from withdrawing money when she puts in an incorrect pin", function() {
			$('input#accountNumber').val('1234567890');
			$('input#PIN').val('5678');
			$('input#amount').val(25);
			$('input#withdraw').click();
			expect($('#cashDrawer').val()).toEqual('0');
		});
		it("Prevents Judy from withdrawing money when she puts in an incorrect account number", function() {
			$('input#accountNumber').val('0987654321');
			$('input#PIN').val('1234');
			$('input#amount').val(25);
			$('input#withdraw').click();
			expect($('#cashDrawer').val()).toEqual('0');
		});
		it("Updates Judys balance when she withdraws money", function() {
			$('input#accountNumber').val('1234567890');
			$('input#PIN').val('1234');
			$('input#amount').val(10);
			$('input#withdraw').click();
			expect($('#accountBalance').text()).toEqual('90');
		});
	});
	describe('Multiple people withdraw money', function() {
		it('Allows Mark to withdraw money when he uses the correct account number and pin', function() {
			tryToWithdrawMoney('0987654321', '1111', 50)
			expect($('#cashDrawer').val()).toEqual('50');
		});
		it('updates only marks balance when he withdraws money', function() {
			tryToWithdrawMoney('0987654321', '1111', 50);
			expect($('#accountBalance').text()).toEqual('50');
			tryToWithdrawMoney('1234567890', '1234', 0);
			expect($('#accountBalance').text()).toEqual('100');
		});
	});
	var tryToWithdrawMoney = function(accountNumber, pin, amount) {
		
			$('input#accountNumber').val(accountNumber);
			$('input#PIN').val(pin);   
			$('input#amount').val(amount);
			$('input#withdraw').click();
	}
});
