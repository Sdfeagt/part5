describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'toor'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.login({ username: 'root', password: 'toor' })
    cy.createBlog({title: 'title', author: 'exists', url: 'yes', likes: 0})
    cy.createBlog({title: 'title2', author: 'exists2', url: 'yes2', likes: 10})
    cy.visit('http://localhost:3000')
  })
    it('front page can be opened', function() {
      cy.contains('Blogs')
    })

    it('login form can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Logout').click()
    })
    it('user can login', function () {
      cy.visit('http://localhost:3000')
      cy.contains('Logout').click()
    })  

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#Title').type('a blog created by cypress title')
      cy.get('#Author').type('a blog created by cypress author')
      cy.get('#Url').type('a blog created by cypress url')
      cy.contains('Add Blog').click()
      cy.contains('a blog created by cypress')

    })

    it('a blog can be liked', function() {
      cy.contains('title').parent().find('#Details').click()
      cy.contains('title').parent().find('#Like').click()
    })

    it('a blog can be deleted', function() {
      cy.contains('title').parent().find('#Details').click()
      cy.contains('title').parent().find('#delete').click()
    })
    it('Sorted by likes', function(){
      cy.contains('title').parent().find('#Details').click()
      cy.contains('title2').parent().find('#Details').click()

      cy.get('.blog').eq(0).should('contain', '0')
      cy.get('.blog').eq(1).should('contain', '10')

    })

  })