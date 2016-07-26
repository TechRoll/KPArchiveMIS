package servlet;

import java.io.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Saveul extends HttpServlet {
	private String ulcontent = "";
	private String filepath = "";
	private String filename = "";

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8;");
		PrintWriter out = response.getWriter();
		out.print(BufferedReaderDemo());
	}

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8;");
		request.setCharacterEncoding("utf-8");

		// ulcontent= new
		// String(request.getParameter("content").getBytes("ISO-8859-1"),
		// "utf-8");
		ulcontent = request.getParameter("content");

		StringBufferDemo(ulcontent);

	}

	public void StringBufferDemo(String ulcontent) throws IOException {
		File file = new File(filepath + filename);
		if (!file.exists())
			file.createNewFile();
		// FileOutputStream out=new FileOutputStream(file,false);
		OutputStreamWriter into = new OutputStreamWriter(new FileOutputStream(
				file, false), "UTF-8");
		into.write(ulcontent.toCharArray());
		into.close();
		// out.close();
	}

	public String BufferedReaderDemo() throws IOException {
		File file = new File(filepath + filename);
		if (!file.exists() || file.isDirectory())
			return "";
		InputStreamReader isr = new InputStreamReader(
				new FileInputStream(file), "utf-8");
		StringBuffer sbread = new StringBuffer();
		while (isr.ready()) {
			sbread.append((char) isr.read());
		}
		isr.close();
		String output = sbread.toString();
		return output;
	}

	@Override
	public void destroy() {
		super.destroy();
	}

	@Override
	public void init() throws ServletException {
		filename = "filecontent.txt";
		filepath = this.getServletConfig().getServletContext().getRealPath("/");
		super.init();
	}
}
