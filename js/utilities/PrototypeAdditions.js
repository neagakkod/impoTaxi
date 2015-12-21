// JavaScript Document

Date.prototype.changeTimePart= function(h,m,s)
{
	this.setHours(h);
	this.setMinutes(m);
	this.setSeconds(s);
};
