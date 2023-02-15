const books = [
  {
    title: "The Design of EveryDay Things",
    author: "Don Norman",
    alreadyRead: false,
    img:
      "http://t2.gstatic.com/images?q=tbn:ANd9GcTQEZhxiVNZAeKa1dGfEzKwLXiyY_78i08Gfhwn53k-JYin9TDO"
  },
  {
    title: "The Most Human Human",
    author: "Brian Christian",
    alreadyRead: true,
    img:
      "http://t2.gstatic.com/images?q=tbn:ANd9GcRqNE0qeS4ldVIC9DbGkx9MOwJ4WWKi6HVvtrtZ8XTKVodonSBy"
  },
  {
    title: "Thinking with Type",
    author: "Ellen Lupton",
    alreadyRead: true,
    img:
      "https://images-na.ssl-images-amazon.com/images/I/518%2BxIiELFL._SX258_BO1,204,203,200_.jpg"
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    alreadyRead: false,
    img: "https://eloquentjavascript.net/img/cover.jpg"
  }
];

/////////////////// My code


// Get the element where the book list will be displayed

const bookList = document.querySelector('.book-list');


// Loop through the books array
books.forEach(book => {
  // Create a new li element to hold the book details
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  // Create a new div element to hold the book cover
  const div = document.createElement('div');
  div.classList.add('d-flex', 'justify-content-center', 'mb-3');
  // Create a new img element for the book cover and set its attributes
  const img = document.createElement('img');
  img.setAttribute('src', book.img);
  img.setAttribute('alt', book.title);
  img.classList.add('img-thumbnail', 'book-cover');
  // Add the img element to the div element
  div.appendChild(img);
  // Add the div element to the li element
  li.appendChild(div);
  // Create a new h2 element for the book title and set its text
  const h2 = document.createElement('h2');
  h2.textContent = book.title;
  li.appendChild(h2);
  // Create a new p element for the author and set its text
  const pAuthor = document.createElement('p');
  const [lastName, firstName] = book.author.split(' ');
  pAuthor.textContent = `${lastName}, ${firstName}`;
  li.appendChild(pAuthor);
  // Create a new p element for the reading status and set its text and styling
  const pStatus = document.createElement('p');
  const badge = document.createElement('span');
  badge.classList.add('badge', 'rounded-pill');
  if (book.alreadyRead) {
    badge.classList.add('bg-success');
    badge.textContent = 'Read';
  } else {
    badge.classList.add('bg-secondary');
    badge.textContent = 'To read';
  }
  pStatus.appendChild(badge);
  li.appendChild(pStatus);
  // Add the li element to the book list
  bookList.appendChild(li);
});




// Sort the book list by authors' last names in alphabetical order
books.sort((a, b) => {
  const [aLastName, aFirstName] = a.author.split(' ');
  const [bLastName, bFirstName] = b.author.split(' ');
  if (aLastName < bLastName) {
    return -1;
  } else if (aLastName > bLastName) {
    return 1;
  } else {
    return 0;
  }
});

