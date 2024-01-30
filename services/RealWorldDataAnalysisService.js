const { KMeans, DBSCAN } = require('machinelearn/clustering');
const { StandardScaler } = require('machinelearn/preprocessing');
const TimeSeries = require('timeseries-analysis');


class RealWorldDataAnalysisService {
  static identifyUsagePatterns(waterUsageData) {
    // Extract relevant features for clustering (for example, UsageAmount and MeterReading)
    const features = waterUsageData.map((usage) => [usage.UsageAmount, usage.MeterReading]);

    // Perform k-means clustering (using machinelearn library)
    const kmeans = new KMeans({ n_clusters: 3 }); // Adjust the number of clusters as needed
    const labels = kmeans.fit_predict(features);

    // Group data points based on cluster labels
    const clusters = {};
    labels.forEach((label, index) => {
      if (!clusters[label]) {
        clusters[label] = [];
      }
      clusters[label].push(waterUsageData[index]);
    });

    return clusters;
  }

  static detectAnomalies(waterUsageData) {
    // Extract relevant features for anomaly detection (for example, UsageAmount)
    const features = waterUsageData.map((usage) => [usage.UsageAmount]);

    // Standardize features
    const scaler = new StandardScaler();
    const standardizedFeatures = scaler.fit_transform(features);

    // Perform DBSCAN for anomaly detection
    const dbscan = new DBSCAN({ eps: 0.5, min_samples: 5 });
    const anomalyLabels = dbscan.fit_predict(standardizedFeatures);

    // Identify anomalies
    const anomalies = waterUsageData.filter((_, index) => anomalyLabels[index] === -1);

    return anomalies;
  }

  static identifyTrends(waterUsageData) {
    // Extract relevant features for trend analysis (for example, Timestamp and UsageAmount)
    const timeSeriesData = waterUsageData.map((usage) => [new Date(usage.Timestamp).getTime(), usage.UsageAmount]);

    // Create a time series from the data
    const ts = new TimeSeries.main(timeSeriesData);

    // Perform trend analysis
    const trend = ts.detrend();

    // Return the trend data
    return { trend: trend.data, message: 'Trend analysis completed' };
  }

}

module.exports = RealWorldDataAnalysisService;
