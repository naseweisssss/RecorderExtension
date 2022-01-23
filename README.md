# RecorderExtension

<a href="http://www.feedbooks.com/"><img src="Orange Modern Minimalist Music Record Logo.png" width="500"/></a>
<br>

## Inspiration
With the fast development of technology, the application of websites becomes an essential part of our daily life. For technology novices, there might be barriers to quick start-up and fully enjoying the functions on the website. For instance, when operations, such as ordering LFT test and booking movie tickets, are mostly online, it would cause a technical barrier to elderly who are not familiar with computer operation. It would be great to have an extension to easily record the visualise instruction while demoing the website and generate the QR code/link to send off for potential users.

## What it does
With our extension, the demonstrating user can easily record reproducible demos on websites. The button they pressed will be highlighted to give clear guidelines to the learning users while following the recording. The file can be easily transferred between users to reproduce the recording, which makes it easily to replicate large scales by organisation, or merely for remote teaching purposes.

## How we built it
The pop-up page, designed with HTML and CSS, incorporates 3 buttons which are embedded with JavaScript. On pressing of relevant buttons, the script will start to record the name attribute of the buttons pressed and push them into a .JSON file. The .JSON file can be then transferred to users or store under internal storage depends on purpose. On receiving the file, another users can load them into the extension, which will then replay the actions that are recorded in form of highlighted button. Google Storage API is used in storing information needed during these processes.
## Challenges we ran into
Challenges encountered includes unable to download the .JSON files directly from browser memory. This is then solved by creating and dispatching events using JavaScript. Other challenges include scarcity of resources online regarding chrome extension building, which can only be solved by browsing through the documentation of the chrome library. Furthermore, chrome browser does not provide any memories for variables to be stored. This is solved by using Chrome Storage API do save data in a cloud platform. However, another challenge arise when the page refreshes and the memory stored will be lost. Moreover, communicating between the background and content JavaScript code raised difficulties as well. 
