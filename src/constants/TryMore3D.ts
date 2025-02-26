export const tryMoreReviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'John',
    username: '@john',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/john',
  },
];

export const firstRow = tryMoreReviews.slice(0, tryMoreReviews.length / 2);
export const secondRow = tryMoreReviews.slice(tryMoreReviews.length / 2);
export const thirdRow = tryMoreReviews.slice(0, tryMoreReviews.length / 2);
export const fourthRow = tryMoreReviews.slice(tryMoreReviews.length / 2);
