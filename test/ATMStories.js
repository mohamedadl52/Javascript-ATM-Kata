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
