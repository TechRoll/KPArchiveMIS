package file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Blob;
import java.sql.Date;

import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.mapping.Table;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

import hibernate.Fileinfo;

public class OperationFileInfo {

	// 会话需要使用的变量
	private static SessionFactory sessionFactory;
	private static Session session;
	private static Transaction transaction;
	private static Configuration config;
	private static ServiceRegistry serviceRegistry;

	// 初始化一些变量
	static {
		config = new Configuration().configure();
		serviceRegistry = new ServiceRegistryBuilder().applySettings(
				config.getProperties()).buildServiceRegistry();
		sessionFactory = config.buildSessionFactory(serviceRegistry);
	}

	// 向数据库中保存一条文件信息
	public static void insertFileInfo(String filePath, String fileName,
			String timeName, String realPath, String timePath,
			Integer fileDelete, String fileTitle, Date createTime,
			String textContent) {
		session = sessionFactory.openSession();
		transaction = session.beginTransaction();

		// 将文件转换成Blob类型
		InputStream input = null;
		Blob blobFile = null;
		File file = new File(filePath);
		try {
			input = new FileInputStream(file);
			blobFile = Hibernate.getLobCreator(session).createBlob(input,
					input.available());
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 创建新的文件信息对象
		Fileinfo fileinfo = new Fileinfo();
		fileinfo.setFileName(fileName);
		fileinfo.setTimeName(timeName);
		fileinfo.setRealPath(realPath);
		fileinfo.setTimePath(timePath);
		fileinfo.setFile(blobFile);
		fileinfo.setFileDelete(fileDelete);
		fileinfo.setFileTitle(fileTitle);
		fileinfo.setCreateTime(createTime);
		fileinfo.setTextContent(textContent);
		session.save(fileinfo);

		transaction.commit();
		session.close();
	}

	// 根据指定的id获得文件对象的信息
	public static String[] getFileInfo(int id) {
		session = sessionFactory.openSession();
		transaction = session.beginTransaction();

		Fileinfo ff = (Fileinfo) session.get(Fileinfo.class, id);
		// 建立返回的数组
		String[] json = { ff.getFileTitle(), ff.getTimePath(),
				ff.getRealPath(), ff.getFileDelete().toString() };

		transaction.commit();
		session.close();

		return json;
	}

	// 返回指定id的fileinfo对象
	public static Fileinfo ReadFileinfo(int id) {
		session = sessionFactory.openSession();
		transaction = session.beginTransaction();

		// 从数据库中读取指定id的file
		Fileinfo f = (Fileinfo) session.get(Fileinfo.class, id);
		session.flush();

		transaction.commit();
		session.close();

		return f;
	}

	// 获取表中一共有多少条记录
	public static int GetTableInfoCount() {
		session = sessionFactory.openSession();
		transaction = session.beginTransaction();

		String hql = "select count(*) from Fileinfo";
		String o = session.createQuery(hql).uniqueResult().toString();

		transaction.commit();
		session.close();

		return Integer.parseInt(o);
	}

	// 获取表中第一条记录的id
	public static int GetFirstInfoId() {
		session = sessionFactory.openSession();
		transaction = session.beginTransaction();

		Query q = session.createQuery("from Fileinfo order by id");
		q.setMaxResults(1);
		Fileinfo t = (Fileinfo) q.uniqueResult();

		transaction.commit();
		session.close();

		return t.getFileId();
	}

	// 这个main用于方法测试
	public static void main(String args[]) {

	}

}
