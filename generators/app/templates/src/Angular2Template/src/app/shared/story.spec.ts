///<reference path="./../../../typings/globals/jasmine/index.d.ts"/>
import { Story } from './story';
//in fact that isn't anything useful, just example
describe('Story', () => {
    it('has content', () => {
        let story: Story = <Story>{ content: "test", numberOfViews: 10 };
        expect(story.content).toEqual('test');
    });
    it('has numberOfViews', () => {
        let story: Story = <Story>{ content: "test", numberOfViews: 10 };
        expect(story.numberOfViews).toEqual(10);
    });
}); 