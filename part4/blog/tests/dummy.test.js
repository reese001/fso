const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require("../utils/list_helper")

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithTwoBlogs = [
        {
            id: '123456789',
            title: 'Go To Statement Considered Harmful',
            author: 'Edgar W. Dijkstra',
            url: 'https://example.com',
            likes: 5,
            __v: 0
        },
        {
            id: '123456789',
            title: 'Go To Statement Considered Harmful',
            author: 'Edgar W. Dijkstra',
            url: 'https://example.com',
            likes: 10,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        assert.strictEqual(result, 15)
    })
})

describe('blog with the most likes', () => {
    const listOfBlogs = [
        {
            id: '1',
            title: 'Blog 1',
            author: 'Bloggy Man',
            url: 'https://example1.com',
            likes: 5,
            __v: 0
        },
        {
            id: '2',
            title: 'Blog 2',
            author: 'Mr. Blogger',
            url: 'https://example2.com',
            likes: 10,
            __v: 1
        },
        {
            id: '3',
            title: 'Blog 3',
            author: 'Evil Man',
            url: 'https://example3.com',
            likes: 15,
            __v: 2
        },
    ]

    test('if list has 1 blog post, returns the first blog post', () => {
        const result = listHelper.favoriteBlog(listOfBlogs)
        assert.deepStrictEqual(result, listOfBlogs[2])
    })
})