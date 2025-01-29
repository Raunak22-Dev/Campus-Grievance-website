import { logout,profile,instagram,twitter,linkedin,github, home, notification, dashboard } from '../assets/icons'



export const NavbarItems = [
    {
      href: "/home",
      label: "Home",
      img: home,
    },
    {
      href: "/Notification",
      label: "Notification",
      img: notification,
      badge: 2
    },
    {
      href: "/Dashboard",
      label: "Dashboard",
      img: dashboard,
    },
  ];

export const pItems=[
    {href:"/profile", label:"User Profile",img:profile},
    {href:"/logout", label:"Logout",img:logout},
]

export const FooterIcons=[
 
     {title:"GitHub",href:"https://github.com/Raunak22-Dev",image:github},
     {title:"Linkedin",href:"https://www.linkedin.com/in/raunak-gangwal-76b487283/",image:linkedin},
     {title:"Instagram",href:"https://www.instagram.com/",image:instagram},
     {title:"Twitter-X",href:"https://www.instagram.com/",image:twitter},
  

]