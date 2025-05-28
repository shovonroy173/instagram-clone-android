export const storyData = [
  {id: 'uploader', name: 'Your Story', isUploader: true},
  {id: '2', name: 'John', image: require('../../assets/images/auth.webp')},
  {id: '3', name: 'Emma', image: require('../../assets/images/auth.webp')},
  {id: '4', name: 'Liam', image: require('../../assets/images/auth.webp')},
  {id: '5', name: 'Olivia', image: require('../../assets/images/auth.webp')},
];

export const postImages = [
  {id: '1', name: 'John', image: require('../../assets/images/auth.webp')},
  {id: '2', name: 'Emma', image: require('../../assets/images/auth.webp')},
  {id: '3', name: 'Liam', image: require('../../assets/images/auth.webp')},
];



export const postData = [
  {
    id: '1',
    username: 'joshua_j',
    address: 'Tokyo, Japan',
    likes: 128,
    images: [
      require('../../assets/images/auth.webp'),
      require('../../assets/images/auth.webp'),
      require('../../assets/images/auth.webp'),
    ],
  },
  {
    id: '2',
    username: 'emma_rose',
    address: 'Paris, France',
    likes: 245,
    images: [
      require('../../assets/images/auth.webp'),
      require('../../assets/images/auth.webp'),
    ],
  },
  {
    id: '3',
    username: 'liam_k',
    address: 'New York, USA',
    likes: 310,
    images: [
      require('../../assets/images/auth.webp'),
      require('../../assets/images/auth.webp'),
      require('../../assets/images/auth.webp'),
    ],
  },
  {
    id: '4',
    username: 'sofia_m',
    address: 'Barcelona, Spain',
    likes: 187,
    images: [
      require('../../assets/images/auth.webp'),
    ],
  },
  {
    id: '5',
    username: 'noah_d',
    address: 'Berlin, Germany',
    likes: 97,
    images: [
      require('../../assets/images/auth.webp'),
      require('../../assets/images/auth.webp'),
    ],
  },
];


export const filteredItems = [
  {
    id: '1',
    uri: require('../../assets/images/auth.webp'),
    title: 'Nature 1',
  },
  {
    id: '2',
    uri: require('../../assets/images/auth.webp'),
    title: 'Nature 2',
  },
  {
    id: '3',
    uri: require('../../assets/images/auth.webp'),
    title: 'City 1',
  },
  {
    id: '4',
    uri: require('../../assets/images/auth.webp'),
    title: 'Architecture 1',
  },
  {
    id: '5',
    uri: require('../../assets/images/auth.webp'),
    title: 'Travel 1',
  },
  {
    id: '6',
    uri: require('../../assets/images/auth.webp'),
    title: 'Animals 1',
  },
];

export const sampleMasonryData = [
  {
    id: 1,
    uri: 'https://picsum.photos/400/600?random=1',
    title: 'Mountain Sunrise',
    likes: 234,
    overlay: true,
  },
  {
    id: 2,
    uri: 'https://picsum.photos/400/800?random=2',
    title: 'Urban Architecture',
    likes: 156,
    overlay: true,
  },
  {
    id: 3,
    uri: 'https://picsum.photos/400/400?random=3',
    title: 'Portrait Study',
    likes: 89,
    overlay: false,
  },
  {
    id: 4,
    uri: 'https://picsum.photos/400/700?random=4',
    title: 'Forest Path',
    likes: 312,
    overlay: true,
  },
  {
    id: 5,
    uri: 'https://picsum.photos/400/500?random=5',
    title: 'Street Art',
    likes: 178,
    overlay: false,
  },
  {
    id: 6,
    uri: 'https://picsum.photos/400/900?random=6',
    title: 'Skyscraper',
    likes: 267,
    overlay: true,
  },
  {
    id: 7,
    uri: 'https://picsum.photos/400/350?random=7',
    title: 'Food Photography',
    likes: 445,
    overlay: false,
  },
  {
    id: 8,
    uri: 'https://picsum.photos/400/650?random=8',
    title: 'Ocean Waves',
    likes: 523,
    overlay: true,
  },
  {
    id: 9,
    uri: 'https://picsum.photos/400/750?random=9',
    title: 'Desert Landscape',
    likes: 198,
    overlay: true,
  },
  {
    id: 10,
    uri: 'https://picsum.photos/400/450?random=10',
    title: 'City Lights',
    likes: 276,
    overlay: false,
  },
  {
    id: 11,
    uri: 'https://picsum.photos/400/550?random=11',
    title: 'Abstract Colors',
    likes: 334,
    overlay: true,
  },
  {
    id: 12,
    uri: 'https://picsum.photos/400/820?random=12',
    title: 'Golden Hour',
    likes: 501,
    overlay: true,
  },
  {
    id: 13,
    uri: 'https://picsum.photos/400/380?random=13',
    title: 'Minimalist Design',
    likes: 152,
    overlay: false,
  },
  {
    id: 14,
    uri: 'https://picsum.photos/400/680?random=14',
    title: 'Vintage Car',
    likes: 298,
    overlay: true,
  },
  {
    id: 15,
    uri: 'https://picsum.photos/400/420?random=15',
    title: 'Garden Flowers',
    likes: 187,
    overlay: false,
  },
];


export const notifications = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'alex',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    timestamp: 'Today',
    content: 'liked your photo.',
    preview: 'https://i.imgur.com/7Vb8tLs.jpg',
  },
  {
    id: '2',
    type: 'follow',
    user: {
      name: 'sarah',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    timestamp: 'Today',
    content: 'started following you.',
  },
  {
    id: '3',
    type: 'comment',
    user: {
      name: 'john_doe',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    timestamp: 'This Week',
    content: 'commented: "Great shot!"',
    preview: 'https://i.imgur.com/7Vb8tLs.jpg',
  },
];

export const chats = [
  { id: '1', name: 'Alice', lastMessage: 'Hey, what’s up?', time: '2m', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: '2', name: 'Bob', lastMessage: 'Check this out!', time: '10m', avatar: 'https://i.pravatar.cc/100?img=2' },
  // Add more dummy chats
];