/*
Define an interface Book with properties title, author, and publishedYear. Create a function toggleReadStatus that accepts a Book object and returns a new object with an added isRead property (boolean), defaulting to true.

// Sample Input:
const myBook = { title: "TypeScript Guide", author: "Jane Doe", publishedYear: 2024 };
toggleReadStatus(myBook);

// Sample Output:
{
  title: "TypeScript Guide",
  author: "Jane Doe",
  publishedYear: 2024,
  isRead: true
}
*/

interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

interface isRead extends Book {
  isRead: boolean;
}

const toggleReadStatus = (book: Book): isRead => {
  return {
    ...book,
    isRead: true,
  };
};

// const myBook = {
//   title: "TypeScript Guide",
//   author: "Jane Doe",
//   publishedYear: 2024,
// };

// console.log(toggleReadStatus(myBook));
