import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import Greeting from './greeting';

describe('<Greeting>', ()=> {

    it('should update text on click.', ()=> {

        var greeting = ReactTestUtils.renderIntoDocument(
            <Greeting name="World"/>
        );

        var greetingNode = ReactDOM.findDOMNode(greeting);

        expect(greetingNode.textContent).to.equal('Hello World 1!');

        ReactTestUtils.Simulate.click(
            ReactTestUtils.findRenderedDOMComponentWithTag(greeting, 'div')
        );

        expect(greetingNode.textContent).to.equal('Hello World 2!');
    });
});
