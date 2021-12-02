import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";

const Navsidebar = () => {
  return (
    <ProSidebar>
      <SidebarHeader>
        {/**
         *  You can add a header for the sidebar ex: logo
         */}
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          'sidebarTitle'
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/**
         *  You can add the content of the sidebar ex: menu, profile details, ...
         */}
        <Menu iconShape="circle">
          <MenuItem
            // icon={<FaTachometerAlt />}
            suffix={<span className="badge red">'new'</span>}
          >
            'dashboard'
          </MenuItem>
          <MenuItem> 'components'</MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title="withSuffix"
            // icon={<FaRegLaughWink />}
          >
            <MenuItem>'submenu' 1</MenuItem>
            <MenuItem>'submenu' 2</MenuItem>
            <MenuItem>'submenu' 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title="withPrefix"
            // icon={<FaHeart />}
          >
            <MenuItem>'submenu' 1</MenuItem>
            <MenuItem>'submenu' 2</MenuItem>
            <MenuItem>'submenu' 3</MenuItem>
          </SubMenu>
          <SubMenu title="multiLevel">
            <MenuItem>'submenu' 1 </MenuItem>
            <MenuItem>'submenu' 2 </MenuItem>
            <SubMenu title={`'submenu' 3`}>
              <MenuItem>'submenu' 3.1 </MenuItem>
              <MenuItem>'submenu' 3.2 </MenuItem>
              <SubMenu title={`'submenu' 3.3`}>
                <MenuItem>'submenu' 3.3.1 </MenuItem>
                <MenuItem>'submenu' 3.3.2 </MenuItem>
                <MenuItem>'submenu' 3.3.3 </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        {/**
         *  You can add a footer for the sidebar ex: copyright
         */}
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
          
        >

        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Navsidebar;
