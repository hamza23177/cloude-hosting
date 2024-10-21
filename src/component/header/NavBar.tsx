"use client";

import Link from 'next/link';
import { GrTechnology } from "react-icons/gr";
import styles from "./header.module.css";
import { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";

interface NavBarProps {
    isAdmin: boolean;
}
const NavBar = ({isAdmin} : NavBarProps) => {
    
    const [toggle,setToggle] =  useState(false);

  return (
    <nav className={styles.navbar}>
    <div>
        <Link href="/" className={styles.logo}>
            CLOUD
            <GrTechnology />
            HOSTING
        </Link>
    </div>
    <div className={styles.menu}>
    {toggle ? (<RiCloseLargeFill onClick={() => setToggle(prev => !prev)}/>) : (<FiMenu onClick={() => setToggle(prev => !prev)} />)}
    </div>

    <div className={styles.navLinksWrapper}
    style={{
        clipPath:toggle && "polygon(0 0, 100% 0, 100% 100%,0 100%)" || ""
    }}
    >
    <ul className={styles.navLinks}>
        <Link onClick={() => setToggle(false)} className={styles.navLink} href="/">Home</Link>
        <Link onClick={() => setToggle(false)} className={styles.navLink} href="/articles?pageNumber=1">Articles</Link>
        <Link onClick={() => setToggle(false)} className={styles.navLink} href="/about">About</Link>
        {isAdmin && (
            <Link onClick={() => setToggle(false)} className={styles.navLink} href="/admin">AdminDashboard</Link>
        )}
    </ul>
    </div>
    </nav>
  )
}

export default NavBar
