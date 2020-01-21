#!/usr/bin/env python

import os
import json
from pprint import pprint

VERSION = '5.0.0';

htmfile = open(os.getcwd() + '/' + VERSION + '.html','w')
apifile = open(os.getcwd() + '/api.json')
apiinfo = json.load(apifile)

title = json.dumps(apiinfo['title'])
title = title[1:len(title)-1]

html = \
'---\n' + \
'title: API documentation ' + VERSION + '\n' + \
'---\n\n' + \
'{% include bitbox01-subnav.html %}\n\n' + \
'<!-- This file is generated automatically. Any changes will be lost. -->\n\n' + \
'<section class="rightup topFlat with-space gray-gradient">\n' + \
'  <div class="content-width">\n' + \
'    <div class="row center-xs">\n' + \
'      <div class="col-xs-11 col-sm-9 col-md-7 text-left">\n' + \
'        <h1 class="title text-center">API documentation</h1>\n' + \
'        <h3 class="subtitle text-center">Version: ' + VERSION + '</h3>\n' + \
'        <p class="m-top-xlarge">If you wish to test the BitBox for your application, get started quickly using the <a href="https://github.com/digitalbitbox/ElectronDemo" target="_blank">Electron app demo</a> or the <a href="https://github.com/digitalbitbox/mcu/tree/master/py" target="_blank">Python command line interface</a>. You can also take a look at a full featured native implementation in our <a href="https://github.com/digitalbitbox/bitbox-wallet-app" target="_blank">desktop app</a>.</p>\n' + \
'        <p>The BitBox is a plug-n-play USB-HID device with a simple JSON interface. It can be accessed using <a href="http://www.signal11.us/oss/hidapi/" target="_blank">HID API library</a>, a C library that has been ported to many different languages. A web interface using the U2F protocol also exists, but it can only be accessed by whitelisted URLs hardcoded in the firmware.</p>\n' + \
'        <p>The <a href="https://github.com/digitalbitbox/mcu" target="_blank">BitBox code</a> is open source on GitHub. A <a href="https://github.com/digitalbitbox/dbb-app" target="_blank">native cross-platform desktop app</a> provides a client interface for a fully functioning wallet. Two-factor authentication (2FA) using a <a href="https://github.com/digitalbitbox/2FA-app" target="_blank">mobile app</a> provides a remote screen for added security. The BitBox microcontroller code, written in C, can be compiled and run as a standalone program on a PC for testing purposes. A list of API commands is provided below.</p>\n' + \
'        <p>The hierarchical deterministic wallet structure of the BitBox follows the BIP32 and BIP44 standards. Wallets are securely generated onboard the BitBox using a high-quality <a href="https://www.microchip.com/ATAES132A" target="_blank">hardware random number generator</a> to produce entropy. Alternatively, users can <a href="{{ site.baseurl }}{% link bitbox01/backup-center.html %}">load their own wallet</a> from a file on a micro SD card. The micro SD port allows offline <a href="{{ site.baseurl }}{% link bitbox01/backup-center.html %}">backup</a> of the wallet to a file. Random numbers can be requested via the USB interface in order to verify their quality or to use them in other applications.</p>\n' + \
'        <p>All USB communication is password encrypted using the AES-256-CBC algorithm with base-64 encoding. USB packets are sent following the ISO 7816-4 standard. A password must be set before any command is accepted. Brute force password attacks are mitigated as the device will reset and erase all private data after 15 incorrect tries. In case a password is forgotten, reset the device and reload your wallet from the backup on the micro SD card.</p>\n' + \
'      </div>\n' + \
'    </div>\n' + \
'  </div>\n' + \
'</section>\n\n' + \
'<section class="rightup with-space">\n' + \
'  <div class="content-width">\n' + \
'    <div class="row center-xs">\n' + \
'      <div class="col-xs-12 col-sm-11 col-md-10">\n' + \
'        <table class="api-table text-left">\n' + \
'          <thead>\n' + \
'            <tr>\n' + \
'              <th>Method & parameters</th>\n' + \
'              <th>Response</th>\n' + \
'              <th>Notes</th>\n' + \
'            </tr>\n' + \
'          </thead>\n' + \
'          <tbody>\n' + \
''
htmfile.write(html)

for item in apiinfo['api']:

    if 1:
        # #####
        # Title
        title   = json.dumps(item['title'])
        title = title[1:len(title)-1]
        html = \
        '            <tr>\n' + \
        '                <td colspan="3" class="api-subtitle">' + title + '</td>\n' + \
        '            </tr>\n' \
        ''

    for syntax in item['syntax']:
        html = html + '            <tr>\n' \

        # #######
        # Command
        html = html + '               <td>\n'
        for c, v in syntax['method'].iteritems():
            if isinstance(v, dict): # v is a json object
                html = html + '                   "' + c + '" :\n'
                html = html + '                   <br>{<br>\n'
                for cc,vv in v.iteritems():
                    html = html + '                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"' + cc + '" : "' + vv + '",<br>\n'
                html = html[1:len(html)-6] + '<br>\n'
                html = html + '                   }<br><br>\n'

            elif isinstance(v, list):
                html = html + '                   "' + c + '" : [ \n'
                for item in v:
                    html = html + '                   <br>{<br>\n'
                    for cc,vv in item.iteritems():
                        html = html + '                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"' + cc + '" : "' + vv + '",<br>\n'
                    html = html[1:len(html)-6] + '<br>\n'
                    html = html + '                   },\n'
                html = html[1:len(html)-2] + ' ]<br>\n'

            else:
                html = html + '                   "' + c + '" : \n'
                html = html + '                   "' + v + '"<br><br>\n'
        html = html + '               </td>\n'

        # #####
        # Reply
        html = html + '               <td>\n'
        for r, v in syntax['reply'].iteritems():
            if isinstance(v, dict): # v is a json object
                html = html + '                   "' + r + '" :\n'
                html = html + '                   <br>{<br>\n'
                for rr,vv in v.iteritems():
                    html = html + '                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"' + rr + '" : "' + vv + '",<br>\n'
                html = html[1:len(html)-6] + '<br>\n'
                html = html + '                   }<br><br>\n'

            elif isinstance(v, list):
                html = html + '                   "' + r + '" : [ \n'
                for item in v:
                    html = html + '                   <br>{<br>\n'
                    for rr,vv in item.iteritems():
                        html = html + '                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"' + rr + '" : "' + vv + '",<br>\n'
                    html = html[1:len(html)-6] + '<br>\n'
                    html = html + '                   },\n'
                html = html[1:len(html)-2] + ' ]<br>\n'
            else:
                html = html + '                   "' + r + '" : \n'
                html = html + '                   "' + v + '"<br><br>\n'
        html = html + '               </td>\n'


        # #####
        # Notes
        n = json.dumps(syntax['notes'])
        n = n[1:len(n)-1]
        html = html + \
        '               <td class="api-notes">\n' \
        '                   ' + n + '<br><br>\n' \
        '               </td>\n' \
        '            </tr>\n' \
        ''

    htmfile.write(html)

footnote = json.dumps(apiinfo['footnote'])
footnote = footnote[1:len(footnote)-1]

html = \
'          </tbody>\n' + \
'        </table>\n' + \
'        <p>' + footnote + '</p>\n' + \
'      </div>\n' + \
'    </div>\n' + \
'  </div>\n' + \
'</section>\n\n' + \
''
htmfile.write(html)
