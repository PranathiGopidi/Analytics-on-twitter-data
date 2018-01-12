import java.io.{File, PrintWriter}

import org.apache.spark.{SparkConf, SparkContext}

/**
  * Created by sruthigelivi on 4/26/17.
  */
object analytics {

  def main(args: Array[String]): Unit = {

    val conf = new SparkConf().setAppName("Analytics").setMaster("local[*]")

    val sc = new SparkContext(conf)

    val sqlContext = new org.apache.spark.sql.SQLContext(sc)

    val lines= sc.textFile("/Users/sruthigelivi/Desktop/twitterdata.txt")

    val hashtags = sqlContext.read.json("/Users/sruthigelivi/Desktop/twitterdata.txt")

    val hashtagdf = hashtags.toDF()

    val dftab = hashtagdf.registerTempTable("dftab")

    hashtags.createOrReplaceTempView("dftab");


    // query using rdd
    val horror=lines.filter(line=>line.contains("#horror")).count()
    val comedy=lines.filter(line=>line.contains("#comedy")).count()
    val thriller=lines.filter(line=>line.contains("#thriller")).count()
    val action=lines.filter(line=>line.contains("#action")).count()
    println("Horror Movies %s".format(horror))
    println("Comedy Movies %s".format(comedy))
    println("Thriller Movies %s".format(thriller))
    println("Action Movies %s".format(action))
    val movieslist = List(("horror", horror),("comedy", comedy),("thriller", thriller),("action", action))
    val rdd1 = sc.parallelize(movieslist)
    //rdd1.collect().foreach(println)
    rdd1.coalesce(1).saveAsTextFile("Movies genre")



    // query for web and Android devices from each country

    val web =sqlContext.sql("select count(place.country),place.country from dftab" +
      " where source like '%Web Client%' group by place.country,source order by count(place.country) DESC")
    web.show()
    web.limit(5).rdd.coalesce(1).saveAsTextFile("Devices/web")

    val Android = sqlContext.sql("select count(place.country),place.country from dftab " + "where source like '%Android%' and place.country !='null' group by place.country,source order by count(place.country) DESC")
    Android.show()
    Android.limit(5).rdd.coalesce(1).saveAsTextFile("Devices/Adnroid")

    // query to get number of tweets per hour

    val hour = sqlContext.sql("select substring(created_at, 12,2), count(*)" +
      " as count from dftab where created_at is not null " +
      "group by substring(created_at, 12,2) ORDER BY count DESC ")


    hour.rdd.coalesce(1).saveAsTextFile("hours")




    //Finds the count of no.of users from countries around the world who tweeted on movies
    val country=sqlContext.sql("select place.country, count(*) as country_count from dftab where place.country IS NOT NULL GROUP BY place.country ORDER BY country_count DESC")
    country.show()
    printToFile(new File("country.txt")) { p => country.collect().foreach(p.println) }

    //Finds the count of users from specified languages who tweeted on movies
    val fwriter = new PrintWriter(new File("newFile.txt"))
    //english
    val en=sqlContext.sql("select user.lang, count(*) as en_count from dftab where user.lang like 'en' group by user.lang")
    en.show()
    printToFile(new File("en.txt")) { p => en.collect().foreach(p.println) }
    //spanish
    val es=sqlContext.sql("select user.lang, count(*) as es_count from dftab where user.lang like 'es' group by user.lang")
    es.show()
    printToFile(new File("es.txt")) { p => es.collect().foreach(p.println) }
    //german
    val ja=sqlContext.sql("select user.lang, Count(*) as ja_count from dftab where user.lang like 'ja' group by user.lang")
    ja.show()
    printToFile(new File("ja.txt")) { p => ja.collect().foreach(p.println) }
    //portuguese
    val pt=sqlContext.sql("select user.lang, count(*) as pt_count from dftab where user.lang like 'pt' group by user.lang")
    pt.show()
    printToFile(new File("pt.txt")) { p => pt.collect().foreach(p.println) }
    //france
    val fr=sqlContext.sql("select user.lang, Count(*) as fr_count from dftab where user.lang like 'fr' group by user.lang")
    fr.show()
    printToFile(new File("fr.txt")) { p => ja.collect().foreach(p.println) }


    printToFile(new File("fr.txt")) { p => ja.collect().foreach(p.println) }


      sc.stop()

  }
  def printToFile(f: java.io.File)(op: java.io.PrintWriter => Unit) {
    val p = new java.io.PrintWriter(f)
    try {
      op(p)
    } finally {
      p.close()
    }
  }

}
