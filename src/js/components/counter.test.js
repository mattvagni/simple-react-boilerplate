import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import Counter from './counter';

describe('<Counter>', ()=> {

    it('should update the counter on click of the button.', ()=> {

        var counter = ReactTestUtils.renderIntoDocument(
            <Counter startingNumber={42}/>
        );

        var counterNode = ReactDOM.findDOMNode(counter);


        expect(counterNode.querySelector('div').textContent).to.equal('42');

        ReactTestUtils.Simulate.click(
            ReactTestUtils.findRenderedDOMComponentWithClass(counter, 'counter-button')
        );

        expect(counterNode.querySelector('div').textContent).to.equal('43');
    });

});
