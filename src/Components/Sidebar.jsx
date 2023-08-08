import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Shopping',
    path: 'https://www.bigbasket.com',
    icon: <FaIcons.FaShoppingCart />,
    cName: 'nav-text'
  },
  {
    title: 'Popular Recipes',
    path: '/popularRecipe',
    icon: <HiIcons.HiTrendingUp />,
    cName: 'nav-text'
  },
  {
    title: 'Article',
    path: '/articles',
    icon: <MdIcons.MdArticle />,
    cName: 'nav-text'
  },
  {
    title: 'Saved Recipes',
    path: '/savedRecipes',
    icon: <MdIcons.MdBookmark />,
    cName: 'nav-text'
  },
  {
    title: 'Suggestion',
    path: '/suggestion',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <MdIcons.MdSettings />,
    cName: 'nav-text'
  }
];
