describe('Book Service Tests', function() {
    'use strict';

    beforeEach(function() {
        module('app.component1');
    });

    var $bookService;

    beforeEach(inject(function(bookService) {
        $bookService = bookService;
    }));

    it('should be defined getBooksFromJson', inject(function() {
            //then
            expect($bookService.getBooksFromJson()).toBeDefined();
    })),

    it('should get list of rest books before any action', inject(function() {
            //when
            var restBook = $bookService.getRestBooks();
            //then
            expect(restBook.length).toBe(0);
    })),

    it('should add book to list of books', inject(function() {
            //given
            var newBook = {
                id: 1,
                version: 0,
                title: 'title',
                author: 'author',
                genre: 'genre',
                year: 2000
            };
            //when
            $bookService.addBook(newBook);
            var restBook = $bookService.getRestBooks();
            //then
            expect(restBook.length).toBe(1);
    })),

    it('should update book', inject(function() {
            //given
            var restBook = $bookService.getRestBooks();
            var updateBook = restBook[0];
            updateBook = {
                id: 1,
                version: 1,
                title: 'updatedTitle',
                author: 'author',
                genre: 'genre',
                year: 2000
            };
            //when
            var newBook = $bookService.updateBook(updateBook);
            //then
            expect(newBook.title).toBe(updateBook.title);
    })),

    it('should get books by genre', inject(function() {
            //given
            var newBook = {
                id: 1,
                version: 1,
                title: 'title',
                author: 'author',
                genre: 'genre',
                year: 2000
            };
            $bookService.addBook(newBook);
            //when
            var genresList = $bookService.getGenres();
            //then
            expect(genresList[0]).toBe('it');
            expect(genresList[1]).toBe('genre');
    })),

    it('should get empty book', inject(function() {
            //when
            var newBook = $bookService.getEmptyBook();
            //then
            expect(newBook.id).toBe('');
            expect(newBook.version).toBe('');
            expect(newBook.genre).toBe('');
            expect(newBook.title).toBe('');
            expect(newBook.author).toBe('');
    }));

});
