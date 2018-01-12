
import org.apache.spark.sql.SparkSession
import org.apache.spark.{SparkConf, SparkContext}

  /*
  * Created by sruthigelivi on 4/30/17.
  */
object Trends {

  def main(args: Array[String]): Unit = {

    val conf = new SparkConf().setAppName("Trends").setMaster("local[*]")

    val sc = new SparkContext(conf)
    val sqlContext = new org.apache.spark.sql.SQLContext(sc)

    val spark = SparkSession
      .builder()
      .appName("Spark SQL basic example")
      .config("spark.some.config.option", "some-value")
      .getOrCreate()


    import spark.implicits._
    import org.apache.spark.sql.functions._
    val hashtags= sqlContext.read.json("input/trends.txt")



    val trends=hashtags.select(explode($"details.trends").as("trend"))

    trends.show()


    val names=trends.select(explode($"trend.name").as("names"))

    names.show()

    //names.groupBy($"names").count().orderBy($"count".desc).limit(5).show()
    var l = names.groupBy($"names").count().orderBy($"count".desc).limit(5)

    l.rdd.coalesce(1).saveAsTextFile("Trends/names")



    sc.stop()

  }

}

