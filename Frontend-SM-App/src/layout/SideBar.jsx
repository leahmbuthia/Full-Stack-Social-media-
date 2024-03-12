import './SideBar.scss';
import SideItems from '../components/sidebar/SideItems';
import ShortCuts from '../components/sidebar/ShortCuts';
import SideProfile from '../components/sidebar/SideProfile';

const SideBar=()=>{

    const username = localStorage.getItem('username');
    const tagname = localStorage.getItem('tagname');
   
    return (
        <div className='sidenav'>
         <div className="SideProfile">
        <SideProfile username={username} tagname={tagname} />
         </div>
        <div className="sidenav-menu">
            <SideItems/>
        </div>
        <div className="sidebar-shortCuts">
        <ShortCuts />
      </div>
        </div>
    )
};

export default SideBar;