<template>
  <div class="index-container w1920 flex-column">
    <div class="main flexauto">
      <div class="main-content flex-wrap  ">
        <div class="left-listbox  ">
          <div class="aprus-lead flex-column ">
            <div class="lead-top">
              <h2 class="title">APRUS LEAD</h2>
            </div>

            <div class="lead-search">
              <div class="search-box">
                <div class="search-item">
                  <el-input v-model="searchAprusObj.aprus_id" placeholder="请输入要查询的适配器"></el-input>
                </div>
                <div class="search-item prob">
                  <el-select v-model="searchAprusObj.prob">
                    <el-option v-for="item in searchProbArr" :label="item" :value="item" :key="item"></el-option>
                  </el-select>
                </div>

                <div class="search-item search-btn" @click="toSearchAprus">
                  <span ><i class="fa fa-search fa-lg" aria-hidden="true"></i></span>
                </div>
              </div>
            </div>

            <div class="lead-body  flexauto flex-column">
              <div class="lead-form flexauto flex-column">

                <el-table :data="aprusArr" style="width: 100%" height="100%" ref="aprusTable" highlight-current-row
                  @row-click="handleAprusRowClick">
                  <!-- <el-table-column
                    type="index"
                    >
                  </el-table-column> -->
                  <el-table-column prop="created" label="Date Time" width="150">
                    <template slot-scope="scope">
                      {{scope.row.created.substring(5)}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="aprus_id" label="AprusID" width="180">
                  </el-table-column>
                  <el-table-column prop="code" label="Code" width="60">
                    <template slot-scope="scope">
                      {{scope.row.code.code.substring(0,2)}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="probability" label="Prob" width="80">
                  </el-table-column>

                </el-table>

              </div>

              <div class="aprus-pagination">
                <div class="pagination-box">
                  <div class="block">
                    <el-pagination @current-change="handleAprusPageChange" layout="total, prev, pager, next, jumper"
                      :current-page="aprusPagination.page_index" :page-size="aprusPagination.page_size" :total="aprusPagination.total">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-main flexauto">
          <div class="right-content  ">
            <div class="right-box flex-column">
              <div class="right-head clearfix flex-wrap">
                <div class="head-main flexauto flex-wrap">
                  <div class="aprus-info flex-column">
                    <div class="aprusid">
                      <h3>{{currentAprus.aprus_id}}</h3>
                    </div>
                    <div class="aprus-status flexauto flex-wrap">
                      <div class="num " id="probid" style="width: 270px;height: 200px">
                        <div class="num-circle prob">
                          <div class="circlebox">
                            <div class="key">Prob</div>
                            <div class="value">{{currentAprus.probability}}</div>
                          </div>
                        </div>
                      </div>


                      <div class="num ">

                        <div class="num-circle code">
                          <div class="circlebox">
                            <div class="key">Code</div>
                            <div class="value">{{currentAprus.code.code}}</div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>

                  <div class="aprus-lead flexauto flex-column">
                    <div class="lead-content flexauto flex-column">
                      <div class="lead-top  flex-column">
                      <div class="title flexauto flex-column">
                        <div class="operate flexauto flex-wrap flex-end">
                          <div class="op-item">
                            <el-button type="primary" round @click="handleDiagnoseClick" :disabled="aprusArr.length == 0">Diagnose</el-button>
                          </div>
                          <div class="op-item">
                            <el-button type="warning" round @click="handleRebootClick" :disabled="aprusArr.length == 0">Reboot</el-button>
                          </div>
                        </div>

                      </div>



                    </div>

                    <div class="lead-main flexauto flex-column">
                      <div class="content flexauto flex-column">
                        <div class="lead-message flexauto flex-column">
                          <div class="message-item">
                            <div class="desc">Aprus Lead Evaluation by</div>
                          </div>
                          <div class="message-item">
                            <div class="item-label">
                              <span class="circle">{{currentAprus.description.P}}</span>
                            </div>

                            <div class="item-label">
                              <span class="type">I=</span><span class="value">{{currentAprus.description.count.I}}</span>
                            </div>

                            <div class="item-label">
                              <span class="type">N=</span><span class="value">{{currentAprus.description.count.N}}</span>
                            </div>

                            <div class="item-label">
                              <span class="type">R=</span><span class="value">{{currentAprus.description.count.R}}</span>
                            </div>
                          </div>


                          <div class="message-item">
                            <div class="result">
                              <span class="circle">General</span>
                              <span>Z ( </span>
                              <span class="type">{{currentAprus.description.P}}</span>
                              <span> ) &nbsp; &nbsp;Ranged </span>
                              <span class="value">{{currentAprus.description.general}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    

                  </div>
                </div>
              </div>

              <div class="right-body flexauto flex-column">
                <div class="body-main">
                  <div class="body-box flex-column">
                    <div class="datagram-head">
                      <div class="head-content">
                        <div class="datagram-type">

                          <div class="type-item">
                            <span v-for="item in datagramTypeArr" :key="item.value" :class="{select: item.value == selectedDatagramType}"
                              @click="handleDatagramTypeChange(item.value)">{{item.label}}</span>
                          </div>
                        </div>
                      </div>

                    </div>


                    <div class="datagram-form flexauto  flex-column">
                      <el-table :data="currentAprusCurrentDatagramArr" class="form-main flexauto " style="width: 100%; max-width: 100%;" height="100%">
                       
                        <el-table-column prop="time" label="Time" width="200">
                        </el-table-column>

                        <el-table-column prop="topic" label="Topic" width="80">
                        </el-table-column>

                        <el-table-column prop="payload" label="Message">
                          <template slot-scope="scope">
                            {{JSON.stringify(scope.row.payload)}}
                          </template>
                        </el-table-column>

                       
                      </el-table>


                      <div class="datagram-pagination">
                        <div class="block">
                          <el-pagination @current-change="handleDatagramPageChange" layout="total, prev, pager, next, jumper"
                            :current-page="datagramPagination.current_size" :page-size="datagramPagination.page_size"
                            :total="datagramPagination.total">
                          </el-pagination>
                        </div>

                      </div>

                    </div>


                  </div>
                </div>
              </div>

            </div>
          </div>
          
          
          
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SD from "silly-datetime";
import indexApi from "@/api/index.js";
import Echarts from "echarts";
export default {
  data: function() {
    return {
      aprusArr: [],
      currentAprus: {
        aprus_id: "",
        code: {
          P: "P2",
          code: ""
        },
        created: "",
        description: {
          P: "P2",
          count: {
            I: 0,
            N: 0,
            R: 0
          },
          general: 0
        },
        e_value: {
          P: "P2",
          e_value: 0
        },
        probability: "0.00%"
      },

      searchAprusObj: {
        aprus_id: "",
        prob: "0%"
      },
      searchProbArr: ["0%","10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"],

      currentAprusCurrentDatagramArr: [], //当前适配器的  选中的报文类型的   数据

      // datagramTypeArr: ["d", "e", "i", "n", "r"],
      datagramTypeArr: [
        {
          label: "D",
          value: "d"
        },
        {
          label: "E",
          value: "e"
        },
        {
          label: "I",
          value: "i"
        },
        {
          label: "N",
          value: "n"
        },
        {
          label: "R",
          value: "r"
        }
      ],
      selectedDatagramType: "i", //当前适配器的  选中的报文类型,   可为 d,e,i,n,r

      aprusPagination: {
        page_index: 1,
        page_size: 20,
        total: 0
      },

      datagramPagination: {
        page_index: 1,
        page_size: 20,
        total: 0
      }
    };
  },

  mounted: function() {
    var self = this;
    self.drawProb(self.currentAprus.probability);
    this.getData();
    // this.getAprusList();
  },

  methods: {
    getData() {
      var self = this;
      console.log(this.searchAprusObj.aprus_id);
      console.log(this.$validator.ltrim(this.searchAprusObj.aprus_id)  );
      indexApi.getAprusList(
        function(res) {
          var result = res.result;
          if (res.code == 200) {
            if (res.result.length > 0) {
              self.aprusArr = result;
              // self.aprusPagination.total = result.pages;
              self.aprusPagination.total = res.total_records;

              self.currentAprus = result[0];
              self.$refs.aprusTable.setCurrentRow(result[0]);

              self.drawProb(self.currentAprus.probability);

              var end_time = self.currentAprus.created;
              var start_time = self.getStartTime(
                self.currentAprus.created,
                self.currentAprus.description.P
              );
              console.log(start_time);

              indexApi.getDatagramByAprusId(
                function(res) {
                  var result = res.result;
                  if (res.code == 200) {
                    // self.datagramPagination.total = result.total_pages;
                    self.currentAprusCurrentDatagramArr = result.data;
                    self.datagramPagination.total = result.total_records;
                  }
                },
                {
                  // aprus_id: "A22017051300295",
                  aprus_id: self.currentAprus.aprus_id,
                  topic: self.selectedDatagramType,
                  page_size: self.datagramPagination.page_size,
                  page_index: 1,
                  start_time: start_time,
                  end_time: end_time
                }
              );
              return;
            }
            self.aprusArr = [];
            self.aprusPagination.total = 0;
            self.aprusPagination.page_index = 1;

            // self.aprusPagination.total = result.pages;
          }
        },
        {
          page_size: self.aprusPagination.page_size,
          page_index: self.aprusPagination.page_index,
          aprus_id: self.$validator.ltrim(self.searchAprusObj.aprus_id),
          prob: encodeURIComponent(self.searchAprusObj.prob)
        }
      );
    },
    drawProb(percentage) {
      var mychart = Echarts.init(document.getElementById("probid"));
      percentage = percentage.replace("%", "");

      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{c}%"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["60%", "90%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: Math.abs(parseFloat(percentage)),
                name: "Prob",
                itemStyle: { color: "#f00" },
                emphasis: { label: { color: "#62769E" } }
              },
              {
                value: 100 - Math.abs(parseFloat(percentage)),
                name: "Safe",
                itemStyle: { color: "#3EF099" }
              }
            ]
          }
        ]
      };

      console.log(JSON.stringify(option));

      mychart.setOption(option);
    },

    toSearchAprus() {
      console.log("search");
      console.log(JSON.stringify(this.searchAprusObj)  );
      this.aprusPagination.page_index = 1;
      this.getData();
    },
    getDatagramByAprusId() {
      var self = this;
      indexApi.getDatagramByAprusId(
        function(res) {
          var result = res.result;
          if (res.code == 200) {
            self.datagramPagination.total = result.pages;
            self.currentAprusCurrentDatagramArr = result.result;
          }
        },
        {
          // aprus_id: "A22017051300295",
          aprus_id: self.currentAprus.aprus_id,
          page_size: this.datagramPagination.page_size,
          page_index: this.datagramPagination.page_index,
          topic: self.selectedDatagramType
        }
      );
    },

    getAprusList() {
      indexApi.getAprusList(function(res) {
        console.log(res);
      });
    },
    handleAprusRowClick(row) {
      console.log(row);
      this.$refs.aprusTable.setCurrentRow(row);
      this.currentAprus = row;
      this.selectedDatagramType = "i";
      var self = this;

      self.drawProb(self.currentAprus.probability);

      var end_time = self.currentAprus.created;
      var start_time = self.getStartTime(
        self.currentAprus.created,
        self.currentAprus.description.P
      );
      console.log(start_time);

      indexApi.getDatagramByAprusId(
        function(res) {
          console.log("报文");
          console.log(res);
          var result = res.result;
          if (res.code == 200) {
            self.datagramPagination.total = result.total_records;
            self.currentAprusCurrentDatagramArr = result.data;
          }
        },
        {
          // aprus_id: "A22017051300295",
          aprus_id: self.currentAprus.aprus_id,
          topic: self.selectedDatagramType,
          page_size: self.datagramPagination.page_size,
          page_index: 1,
          start_time: start_time,
          end_time: end_time
        }
      );
    },

    handleAprusPageChange(val) {
      console.log("即将跳转到" + val + "页");
      this.aprusPagination.page_index = val;
      var self = this;
      this.getData();
    },

    handleDatagramPageChange(val) {
      console.log("即将跳转到" + val + "页");
      this.datagramPagination.page_index = val;
      var self = this;

      var end_time = self.currentAprus.created;
      var start_time = self.getStartTime(
        self.currentAprus.created,
        self.currentAprus.description.P
      );
      console.log(start_time);
      indexApi.getDatagramByAprusId(
        function(res) {
          console.log("报文");
          console.log(res);
          var result = res.result;
          if (res.code == 200) {
            self.datagramPagination.total = result.total_records;
            self.currentAprusCurrentDatagramArr = result.data;
          }
        },
        {
          // aprus_id: "A22017051300295",
          aprus_id: self.currentAprus.aprus_id,
          topic: self.selectedDatagramType,
          page_size: self.datagramPagination.page_size,
          page_index: self.datagramPagination.page_index,
          start_time: start_time,
          end_time: end_time
        }
      );
    },

    handleDatagramTypeChange(type) {
      console.log(type);
      this.selectedDatagramType = type;
      var self = this;
      var end_time = self.currentAprus.created;
      var start_time = self.getStartTime(
        self.currentAprus.created,
        self.currentAprus.description.P
      );
      console.log(start_time);

      indexApi.getDatagramByAprusId(
        function(res) {
          console.log("报文");
          console.log(res);
          var result = res.result;
          if (res.code == 200) {
            self.datagramPagination.total = result.total_records;
            self.currentAprusCurrentDatagramArr = result.data;
          }
        },
        {
          // aprus_id: "A22017051300295",
          aprus_id: self.currentAprus.aprus_id,
          topic: self.selectedDatagramType,
          page_size: self.datagramPagination.page_size,
          page_index: 1,
          start_time: start_time,
          end_time: end_time
        }
      );
    },

    getAprusRowKey(row) {
      return row.aprus_id;
    },

    handleDiagnoseClick() {
      console.log("diagnose");
      indexApi.diagnose(
        function(res) {
          console.log("diagnose success");
          console.log(res);
        },
        {
          i_type: "adapter",
          command: {
            aprus_id: this.currentAprus.aprus_id,
            param: '["Reboot"]'
          }
        }
      );
    },

    handleRebootClick() {
      console.log("reboot");
      var self = this;

      indexApi.reboot(
        function(res) {
          console.log("reboot success");
          console.log(res);
        },
        {
          i_type: "adapter",
          command: {
            aprus_id: self.currentAprus.aprus_id,
            param: '["Reboot"]'
          }
        }
      );
    },

    initCurrentAprusInfo() {
      this.currentAprus = {
        aprus_id: "",
        code: {
          P: "P2",
          code: ""
        },
        created: "",
        description: {
          P: "P2",
          count: {
            I: 0,
            N: 0,
            R: 0
          },
          general: 0
        },
        e_value: {
          P: "P2",
          e_value: 0
        },
        probability: "0.0%"
      };
    },

    getStartTime(endtime, type) {
      var time = "";

      if (type.toLowerCase() == "p1") {
        time = SD.format(
          +new Date(endtime) - 15 * 60 * 1000,
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        time = SD.format(
          +new Date(endtime) - 4 * 60 * 60 * 1000,
          "YYYY-MM-DD HH:mm:ss"
        );
      }

      return time;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/index.scss";
</style>
