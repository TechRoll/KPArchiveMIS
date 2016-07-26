package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import office2swf.StartOpenOffice;

public class ToSearch extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8;");
		request.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();

		String clientName = new String(request.getParameter("content")
				.getBytes("ISO-8859-1"), "utf-8");

		String filepath = this.getServletConfig().getServletContext()
				.getRealPath("/")
				+ "userFile\\";

		SearchContent searchsontent = new SearchContent(filepath, clientName,
				"doc", out, filepath.length());
		searchsontent.startSearchContent();
		// out.print("<b>"+clientName+"</b>");
	}

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8;");
		doGet(request, response);
	}

	@Override
	public void destroy() {
		super.destroy();
	}

	@Override
	public void init() throws ServletException {
		super.init();
	}
}
