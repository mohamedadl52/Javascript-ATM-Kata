describe("ATM", function(){
	var atm;

	beforeEach(function() {
		atm = ATM.create();
		var bank = jasmine.createSpyObj('the bank', ['balance']);
		atm.bank = bank;
	});

	it("Lets Judy withdraw $10 when she has $20 in her account", function() {
		atm.bank.balance.andReturn(20);
		expect(atm.withdraw(10)).toEqual(10);
	});

	it("Prevents Judy from withdrawing $10 when she has $5 in her account", function() {
		atm.bank.balance.andReturn(5);
		expect(atm.withdraw(10)).toEqual(0);
	});
});
