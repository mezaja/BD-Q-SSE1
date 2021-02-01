import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { DocumentsList } from './components/DocumentsList';
import  UploadDocument  from './components/UploadDocument';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/upload-document' component={UploadDocument} />
        <Route path='/documents-list' component={DocumentsList} />
      </Layout>
    );
  }
}
