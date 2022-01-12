/*
 * @Author: web.王晓冬
 * @Date: 2019-08-01 11:54:35
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-27 14:31:18
 * @Description: 自定义指令 directive
 * @axample: 
 */

let unit = (val) => {
  if (typeof val == "string") {
    return val
  } else {
    return val + 'px'
  }
}
export default {
  // 高度 用于style里的widht设置  string,number#
  w: {
    inserted(el, binding) {
      if (binding.value) {
        el.style.width = unit(binding.value)
      }
    },
    update(el, binding) {
      if (binding.value) {
        el.style.width = unit(binding.value)
      }
    },
    unbind(el) {
      el.style.width = null;
    }
  }, //end
  // 高度 用于style里的height设置 string,number#
  h: {
    inserted(el, binding) {
      if (binding.value) {
        el.style.height = unit(binding.value)
      }
    },
    update(el, binding) {
      if (binding.value) {
        el.style.height = unit(binding.value)
      }
    },
    unbind(el) {
      el.style.height = null;
    }
  }, //end

  padding: {
    inserted(el, binding) {
      if (binding.value) {
        el.style.padding = binding.value + unit(binding.value);
      }
    },
    update(el, binding) {
      if (binding.value) {
        el.style.padding = binding.value + unit(binding.value);
      }
    },
    unbind(el) {
      el.style.padding = null;
    }
  },
  font: {
    inserted(el, binding) {
      if (binding && binding.value) {
        el.style.fontSize = `${binding.value}px`;
      }
    },
    update(el, binding) {
      if (binding && binding.value) {
        el.style.fontSize = `${binding.value}px`;
      }
    },
    unbind(el) {
      el.style.fontSize = null;
    }
  },
  color: {
    inserted(el, binding) {
      if (binding.value) {
        el.style.color = binding.value;
      }
    },
    update(el, binding) {
      if (binding.value) {
        el.style.color = binding.value;
      }
    },
    unbind(el) {
      el.style.color = null;
    }
  },
  bgColor: {
    inserted(el, binding) {
      if (binding.value) {
        el.style.backgroundColor = binding.value;
      }
    },
    update(el, binding) {
      if (binding.value) {
        el.style.backgroundColor = binding.value;
      }
    },
    unbind(el) {
      el.style.backgroundColor = null;
    }
  },

  // size 
  size: {
    inserted: function (el, binding) {
      el.style.height = unit(binding.value)
      el.style.width = unit(binding.value)
    },
    update: function (el, binding) {
      el.style.height = unit(binding.value)
      el.style.width = unit(binding.value)
    }

  }, //end
  // size 
  lh: {
    inserted: function (el, binding) {
      el.style.lineHeight = unit(binding.value)

    },
    update: function (el, binding) {
      el.style.lineHeight = unit(binding.value)

    }

  }, //end
  // size 
  focus: {
    inserted: function (el, binding) {
      if (binding.value) {
        // 聚焦元素
        el.focus()
      }
    }
  }, //end
  // click 时间防抖 一般用于 保存按钮 {Number=1000} 毫秒#
  debounce: {
    inserted(el, binding) {
      let duration = binding.value || 1000
      el.addEventListener('click', e => {
        if (!el.disabled) {
          el.disabled = true
          let timer = setTimeout(() => {
            el.disabled = false
            timer = null
          }, duration)
        }
      })
    }
  }, //end
}