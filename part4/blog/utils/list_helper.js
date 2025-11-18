const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
    return sum
}

const favoriteBlog = (blogs) => {
    let favoriteBlogPost = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > favoriteBlogPost.likes) {
            favoriteBlogPost = blog
        }
    })
    return favoriteBlogPost
}

const mostBlogs = (blogs) => {
    
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}