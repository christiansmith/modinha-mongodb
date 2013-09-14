# MongoDB Backend

MongoDB backend for [Modinha](https://github.com/christiansmith/Modinha).


## Installation and Usage

    $ npm install modinha-mongodb

Standalone example (writes to `data/widgets.json`):

    new Mongo('widgets', { ... });
    

Use with Modinha:

    var Modinha = require('modinha');
     
    Modinha.adapter = {
      type: 'modinha-mongodb'
      uri: 'mongodb://username:password@host:port/database'
    };

    var Widget = Modinha.extend('Widgets', null, {
      schema: {
        name:  { type: 'string' },
        color: { type: 'string' }
      },

      // Optional. Overrides first argument to extend.
      collection: 'WidgetStorage'      
    });
     
    Widget.create({ 
      name: 'widgeterific', 
      color: 'crayola random' 
    }, function (err, widget) {
      Widget.find({}, function (err, widgets) {
        Widget.destroy({ color: 'crayola random' }, function (err) {
          // ...
        });
      });
    });


## The MIT License

Copyright (c) 2013 Christian Smith http://anvil.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
