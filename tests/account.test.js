var fs = require('fs');

test('test tab bar default', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    const $ = require('jquery');
    expect($('#default').html()).toBe("Profile");
}); 

test('test default profile edit button', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    const $ = require('jquery');
    expect($('#edit-btn').html()).toBe(' Edit Profile ');
}); 

test('test old password auto empty', () => {
    var html = fs.readFileSync('public/accountpage.html', 'utf8');
    document.body.innerHTML = html;
    const $ = require('jquery');
    expect($('#old-pw').html()).toBe('');
}); 

/*
    TODO:
    - not sure how to test script functions
*/