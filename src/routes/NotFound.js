import{Result, Button} from 'antd';
import {Link} from 'react-router-dom';

function NotFound (){
    return(<div>
        <Result 
        status="404" 
        title="404" 
        subTitle="Sorry, this page you visited does not exist"
        extra={<Link to="/"><Button type="primary">back to indexPage</Button></Link>}
        >
        </Result>
    </div>)

}

export default NotFound;