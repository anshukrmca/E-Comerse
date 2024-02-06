import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const data = [
  {
    src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    channel: 'Don Diablo',
    views: '396k views',
    createdAt: 'a week ago',
  },
  {
    src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
    title: 'Queen - Greatest Hits',
    channel: 'Queen Official',
    views: '40M views',
    createdAt: '3 years ago',
  },
  {
    src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130M views',
    createdAt: '10 months ago',
  },
];


export default function DataLoading() {
  return (
    <div className="p-4 mb-4 rounded-md shadow-md animate-pulse">
      {/* Product Image Skeleton */}
      <div className="bg-gray-300 h-24 w-full mb-4"></div>

      {/* Product Details Skeleton */}
      <div className="flex flex-col">
        <div className="bg-gray-300 h-4 w-2/3 mb-2"></div>
        <div className="bg-gray-300 h-4 w-1/3 mb-2"></div>
        <div className="bg-gray-300 h-4 w-2/4 mb-2"></div>
      </div>

      {/* Price and Add to Cart Button Skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="bg-gray-300 h-6 w-1/4"></div>
        <div className="bg-gray-300 h-8 w-16"></div>
      </div>
    </div>
  );
}
