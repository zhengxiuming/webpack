/**
 * Created by zhengxiuming on 2017/6/3.
 */
var React = require('react');
var ReactDOM = require('react-dom');
class App extends React.Component{
    render(){
        return(
            <div>
                test is test
            </div>
        )
    }
}
const root = document.getElementById("root");

ReactDOM.render(<App />,root);