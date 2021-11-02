# bin/bash
# docker run -p 5601:5601 -d kibana:7.14.2
docker run -p 9200:9200 --net lognetwork -p 9300:9300 -e "discovery.type=single-node" -d elasticsearch:7.14.2
docker run -p 5601:5601 --net lognetwork  -e "xpack.monitoring.elasticsearch.hosts=http://localhost:9200" -d logstash:7.14.2