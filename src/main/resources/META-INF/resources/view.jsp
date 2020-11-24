<%@ include file="/init.jsp" %>
<%@ page import="com.liferay.meetup.react.web.constants.MyFirstReactPortletKeys" %>
<%
String mainRequire = (String)renderRequest.getAttribute(
	MyFirstReactPortletKeys.MAIN_REQUIRE
);
%>
<div id="<portlet:namespace />-root"></div>

<aui:script require="<%= mainRequire %>">
	mainRequire.default('<portlet:namespace />-root');
</aui:script>