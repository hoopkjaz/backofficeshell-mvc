Exigo Distributor Backoffice Shell (ASP.NET MVC 4.5)
===================

This backoffice shell is a great starting point for any Exigo Office client starting a new backoffice using C#/ASP.NET. 

<hr />

## Getting Started

<p>Configuring your backoffice just takes a few steps.</p>

### Add your Exigo API Credentials
<p>In order for your backoffice to use your client's data, you must add your API credentials for your client.</p>

1. Locate and open the global settings found in <code>~/Global/Settings.cs</code>.
2. Locate the static class called <code>ExigoApiCredentials</code>. These are the API credentials used for all web service and OData calls created with the <code>ExigoApiContext</code> factory. Change the default credentials to your own. <br />
<pre>
public static class ExigoApiCredentials
{
    public static string LoginName   = "";
    public static string Password    = "";
    public static string CompanyKey  = "";
}
</pre>

3. <p>Locate the static class called <code>ExigoPaymentApiCredentials</code>. These are the API credentials used when creating credit card tokens with the <code>ExigoApiContext</code> factory. Add your credentials. </p>
<p><em>NOTE: these credentials are only needed if you are using tokenization for your credit card transactions. Chances are good that you will be.</em></p>
<pre>
public static class ExigoPaymentApiCredentials
{
    public static string LoginName = "";
    public static string Password  = "";
}
</pre>


### Add Your SQL Connection String _(for Enterprise clients only)_
<p>If you are an Exigo Enterprise client, you have SQL access to your data. Your connection string is found in the <code>~/web.config</code> under the <code>connectionStrings</code> node. If you do not have your connection string, please contact the Exigo Web Team.</p>


### Add Your OData Service Reference
<p>The OData service reference that is included with this build belongs to the Exigo Demo account. While leaving out this step will not break anything, we generally recommend that you remove the existing reference and add your client's OData reference in.</p> 

1. Delete the <code>Exigo.OData</code> service reference from the <code>~/Service References/</code> folder by selecting it and pressing 'Delete'. Visual Studio will confirm that you want to delete it - press OK to continue.

2. Right-click on the <code>~/Service References/</code> folder and select 'Add Service Reference...'.

3. <p>In the first box entitled 'Address:', enter your OData service reference URL. It will follow this syntax (replace <code>[COMPANYKEY]</code> with your client's key:</p>
<pre>
http://api.exigo.com/4.0/[COMPANYKEY]/model
</pre>

4. In the lower box entitled 'Namespace:', enter <code>Exigo.OData</code>. Note that if you would like to change your namespace to something else, feel free - just be sure to change your project's references from <code>Exigo.OData</code> to your namespace.

5. Press OK.

6. A popup will appear indicating that the server needs to authenticate your request. Press Yes and enter your Exigo API username and password. Once you submit your data, you should have your OData service reference in place and ready to go.


### Configure Your Global Settings
<p>The rest of your backoffice settings are found in the <code>~/Global/Settings.cs</code> file. We recommend going through this file and ensuring that the settings are to your liking. </p>

<p>Pay special attention to the global references to client-specific settings starting at line 122. These references are here so that you can refer to your client's unique settings by name rather than by INT. We have found that this allows you to change details on the fly using Visual Studio's refactoring feature, and it helps your code to be more expressive. We don't force you to use this convention, but we do highly recommend it. </p>


### Build and Test Your Project

<p>Build your project and attempt to run it by pressing <code>CTRL + F5</code>. If your project compiles correctly, you should be good to go!</p>



Disclaimers
=========
Copyright © 2013  Exigo Office, Inc.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

See http://www.gnu.org/licenses for a copy of the GNU General Public License v 3.
To contact Exigo Office, Inc. email travisw@exigo.com or write to Exigo Office, Inc., 8130 John W. Carpenter Fwy., Dallas, TX 75247
